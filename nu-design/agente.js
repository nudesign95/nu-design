import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

// Lee la API Key desde el entorno del sistema de forma segura
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

async function revisarArchivo(rutaRelativa, instruccion) {
  const rutaAbsoluta = path.join(process.cwd(), rutaRelativa);
  
  if (!fs.existsSync(rutaAbsoluta)) {
    console.error(`❌ El archivo no existe en: ${rutaAbsoluta}`);
    return;
  }

  const contenido = fs.readFileSync(rutaAbsoluta, 'utf-8');

  console.log(`\n🔍 Analizando ${rutaRelativa} con el agente...\n`);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Eres un auditor de código experto en Next.js.
Instrucción del usuario: "${instruccion}"

REGLAS STRICTAS PARA PROTEGER EL CÓDIGO:
1. NO borres ni sugieras eliminar componentes, textos o lógica visual existente.
2. Limítate a señalar errores sintácticos, de CSS o de rutas que causen fallos de compilación o 404.
3. Muestra ÚNICAMENTE las líneas específicas que necesitan corrección, explicando el porqué de forma breve.

Código del archivo a revisar:
\`\`\`tsx
${contenido}
\`\`\``,
    });

    console.log("================ RESULTADO DEL ANÁLISIS ================");
    console.log(response.text);
    console.log("========================================================\n");
  } catch (error) {
    console.error("❌ Error al consultar la API de Gemini:", error);
  }
}

const archivoTarget = process.argv[2];
const pregunta = process.argv[3] || "Revisa si hay errores que rompan el build o causen 404 sin borrar diseño.";

if (!archivoTarget) {
  console.log("Uso: node agente.js <ruta-del-archivo> [instrucción]");
  console.log("Ejemplo: node agente.js app/contacto/page.tsx \"por qué da 404\"");
} else {
  revisarArchivo(archivoTarget, pregunta);
}