import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const { itemId, orderId } = await request.json();

    if (!itemId) {
      return NextResponse.json({ error: 'Falta el ID del artículo' }, { status: 400 });
    }

    // 1. Obtener la ruta del archivo desde la base de datos
    const { data: item, error: itemError } = await supabaseAdmin
      .from('store_items')
      .select('file_url, name')
      .eq('id', itemId)
      .single();

    if (itemError || !item) {
      return NextResponse.json({ error: 'Artículo no encontrado en la base de datos' }, { status: 404 });
    }

    // 2. Extraer únicamente el nombre de archivo dentro del bucket store-assets
    let filePath = item.file_url;
    if (filePath.includes('store-assets/')) {
      filePath = filePath.split('store-assets/').pop()!;
    } else if (filePath.startsWith('http')) {
      const urlParts = new URL(filePath).pathname.split('/');
      filePath = urlParts[urlParts.length - 1];
    }

    // 3. Generar enlace firmado con caducidad de 24 horas (86400 segundos)
    const { data: signedData, error: signedError } = await supabaseAdmin
      .storage
      .from('store-assets')
      .createSignedUrl(filePath, 86400, {
        download: true,
      });

    if (signedError || !signedData) {
      console.error('Error Supabase Signed URL:', signedError);
      return NextResponse.json({ error: 'No se pudo generar el enlace seguro del archivo HD' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      downloadUrl: signedData.signedUrl,
      itemName: item.name,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error interno del servidor' }, { status: 500 });
  }
}