import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignorar rutas estáticas, imágenes, página de bloqueo y páginas legales
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

  // Obtener la IP del cliente
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || '127.0.0.1';

  // Omitir verificación en entorno local
  if (ip === '127.0.0.1' || ip === '::1' || process.env.NODE_ENV === 'development') {
    return NextResponse.next();
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

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|aviso-legal|terminos|privacidad|cookies|reembolsos).*)'
  ],
};