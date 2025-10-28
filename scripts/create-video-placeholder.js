const sharp = require('sharp');
const fs = require('fs');

/**
 * Crea un placeholder temporal para el poster del video
 * mientras se optimizan los videos con FFmpeg
 */

async function createVideoPlaceholder() {
  console.log('🎬 Creando placeholder para poster de video...\n');

  const outputPath = 'public/videos/seguridad-poster.jpg';

  // Verificar si ya existe
  if (fs.existsSync(outputPath)) {
    console.log('ℹ️  Ya existe un poster. Saltando...');
    return;
  }

  try {
    // Crear un poster placeholder con fondo rojo Coradir y texto
    const width = 1920;
    const height = 1080;

    // SVG con diseño placeholder
    const svgPlaceholder = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <!-- Fondo rojo Coradir -->
        <rect width="${width}" height="${height}" fill="#600214"/>

        <!-- Gradiente overlay -->
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#600214;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#c09aa1;stop-opacity:0.3" />
          </linearGradient>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#grad)"/>

        <!-- Icono de play -->
        <circle cx="${width/2}" cy="${height/2}" r="80" fill="white" opacity="0.9"/>
        <polygon points="${width/2-30},${height/2-40} ${width/2-30},${height/2+40} ${width/2+40},${height/2}" fill="#600214"/>

        <!-- Texto -->
        <text x="${width/2}" y="${height/2 + 150}"
              font-family="Arial, sans-serif"
              font-size="48"
              font-weight="bold"
              fill="white"
              text-anchor="middle">
          Sistema de Seguridad Coradir
        </text>

        <text x="${width/2}" y="${height/2 + 210}"
              font-family="Arial, sans-serif"
              font-size="32"
              fill="white"
              opacity="0.8"
              text-anchor="middle">
          Protección Integral con Botones Antipánico
        </text>
      </svg>
    `;

    // Convertir SVG a JPG
    await sharp(Buffer.from(svgPlaceholder))
      .jpeg({ quality: 85, progressive: true })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(2);

    console.log(`✅ Placeholder creado: ${outputPath}`);
    console.log(`   Tamaño: ${sizeKB} KB`);
    console.log('\n📝 Nota: Este es un placeholder temporal.');
    console.log('   Reemplaza con un frame real del video usando FFmpeg.');
    console.log('   Ver: scripts/INSTRUCCIONES-VIDEO.md\n');

  } catch (error) {
    console.error('❌ Error creando placeholder:', error.message);
    process.exit(1);
  }
}

// Ejecutar
createVideoPlaceholder().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
