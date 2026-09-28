import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Ignorar rutas estáticas, imágenes, página de bloqueo y páginas legales
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/blocked') ||
    pathname.startsWith('/aviso-legal') ||
    pathname.startsWith('/terminos') ||
    pathname.startsWith('/privacidad') ||
    pathname.startsWith('/cookies') ||
    pathname.startsWith('/reembolsos') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 2. Protección de Rutas de Administración con Supabase Auth
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
          response = NextResponse.next({ request: req });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Si intentan entrar a /admin/tienda sin estar autenticados -> Redirigir a /admin/login
  if (pathname.startsWith('/admin/tienda') && !user) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  // 3. Verificación de IP / VPN / Proxy
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || '127.0.0.1';

  // Omitir verificación de IP en entorno local
  if (ip === '127.0.0.1' || ip === '::1' || process.env.NODE_ENV === 'development') {
    return response;
  }

  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`, { next: { revalidate: 3600 } });
    const data = await res.json();

    if (data.security?.is_vpn || data.security?.is_proxy || data.in_hosting) {
      return NextResponse.redirect(new URL('/blocked', req.url));
    }
  } catch (error) {
    console.error('Error al verificar IP:', error);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|aviso-legal|terminos|privacidad|cookies|reembolsos).*)',
  ],
};