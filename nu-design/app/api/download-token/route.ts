import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Previene que Next.js compile esta ruta como estática durante npm run build
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    return NextResponse.json({ error: 'Configuración de servidor incompleta.' }, { status: 500 });
  }

  // Inicializar cliente dentro de la función del request
  const supabase = createClient(supabaseUrl, supabaseSecretKey);

  const { searchParams } = new URL(request.url);
  const itemId = searchParams.get('item_id');

  if (!itemId) {
    return NextResponse.json({ error: 'Falta el parámetro item_id' }, { status: 400 });
  }

  try {
    const { data: item, error: fetchError } = await supabase
      .from('store_items')
      .select('file_url, name')
      .eq('id', itemId)
      .single();

    if (fetchError || !item?.file_url) {
      return NextResponse.json({ error: 'Archivo no encontrado' }, { status: 404 });
    }

    // Generar URL firmada por 24 horas (86400 segundos)
    const { data: signedData, error: signError } = await supabase.storage
      .from('store-assets')
      .createSignedUrl(item.file_url, 86400);

    if (signError || !signedData?.signedUrl) {
      return NextResponse.json({ error: 'Error al generar enlace seguro' }, { status: 500 });
    }

    return NextResponse.json({
      downloadUrl: signedData.signedUrl,
      fileName: item.name,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error interno del servidor' }, { status: 500 });
  }
}