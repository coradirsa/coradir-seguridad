const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuración de imágenes a optimizar
const images = [
  {
    input: 'public/img/02.png',
    output: 'public/img/02',
    name: '02',
    sizes: [
      { width: 320, suffix: 'mobile', quality: 80 },
      { width: 768, suffix: 'tablet', quality: 85 },
      { width: 1920, suffix: 'desktop', quality: 90 }
    ]
  },
  {
    input: 'public/img/boton seguridad.png',
    output: 'public/img/boton-seguridad',
    name: 'boton-seguridad',
    sizes: [
      { width: 320, suffix: 'mobile', quality: 80 },
      { width: 768, suffix: 'tablet', quality: 85 },
      { width: 1200, suffix: 'desktop', quality: 90 }
    ]
  },
  {
    input: 'public/img/mendozav.png',
    output: 'public/img/mendozav',
    name: 'mendozav',
    sizes: [
      { width: 320, suffix: 'mobile', quality: 80 },
      { width: 768, suffix: 'tablet', quality: 85 },
      { width: 1920, suffix: 'desktop', quality: 90 }
    ]
  }
];

async function optimizeImages() {
  console.log('🚀 Iniciando optimización de imágenes...\n');

  for (const image of images) {
    console.log(`📸 Procesando: ${image.input}`);

    // Verificar que existe el archivo
    if (!fs.existsSync(image.input)) {
      console.error(`❌ No se encontró: ${image.input}`);
      continue;
    }

    // Crear directorio si no existe
    if (!fs.existsSync(image.output)) {
      fs.mkdirSync(image.output, { recursive: true });
      console.log(`📁 Creado directorio: ${image.output}`);
    }

    // Obtener tamaño original
    const originalStats = fs.statSync(image.input);
    const originalSizeMB = (originalStats.size / (1024 * 1024)).toFixed(2);
    console.log(`   Tamaño original: ${originalSizeMB} MB`);

    let totalSaved = 0;

    // Generar versiones WebP en diferentes tamaños
    for (const size of image.sizes) {
      const outputPath = path.join(
        image.output,
        `${image.name}-${size.suffix}.webp`
      );

      try {
        await sharp(image.input)
          .resize(size.width, null, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ quality: size.quality })
          .toFile(outputPath);

        const stats = fs.statSync(outputPath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        totalSaved += originalStats.size - stats.size;

        console.log(`   ✅ ${size.suffix.padEnd(7)} (${size.width}w): ${sizeKB} KB`);
      } catch (error) {
        console.error(`   ❌ Error en ${size.suffix}:`, error.message);
      }
    }

    // Crear fallback JPG comprimido (para navegadores sin soporte WebP)
    const fallbackPath = path.join(
      image.output,
      `${image.name}-fallback.jpg`
    );

    try {
      await sharp(image.input)
        .jpeg({ quality: 75, progressive: true })
        .toFile(fallbackPath);

      const fallbackStats = fs.statSync(fallbackPath);
      const fallbackSizeKB = (fallbackStats.size / 1024).toFixed(2);
      console.log(`   ✅ fallback: ${fallbackSizeKB} KB`);
    } catch (error) {
      console.error(`   ❌ Error en fallback:`, error.message);
    }

    const savedMB = (totalSaved / (1024 * 1024)).toFixed(2);
    const percentage = ((totalSaved / originalStats.size) * 100).toFixed(1);
    console.log(`   💾 Ahorro total: ${savedMB} MB (${percentage}%)\n`);
  }

  console.log('✨ Optimización completada!');
  console.log('\n📊 Resumen:');
  console.log('   - Formatos generados: WebP (mobile, tablet, desktop) + JPG fallback');
  console.log('   - Las imágenes originales NO fueron modificadas');
  console.log('   - Ahora actualiza los componentes para usar las nuevas imágenes');
}

// Ejecutar
optimizeImages().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
