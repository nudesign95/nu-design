import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignorar rutas estáticas, imágenes y la propia página de bloqueo
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/blocked') ||
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
    // Verificación de IP mediante ipapi.co (detecta vpn / proxy / datacenter)
    const res = await fetch(`https://ipapi.co/${ip}/json/`, { next: { revalidate: 3600 } });
    const data = await res.json();

    // Si ipapi detecta que es un proxy/hosting/vpn de datacenter
    if (data.security?.is_vpn || data.security?.is_proxy || data.in_hosting) {
      return NextResponse.redirect(new URL('/blocked', req.url));
    }
  } catch (error) {
    // Si falla la API externa, permite el paso sin interrumpir al usuario legítimo
    console.error('Error al verificar IP:', error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};