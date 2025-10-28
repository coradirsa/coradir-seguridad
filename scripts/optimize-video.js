const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const fs = require('fs');
const path = require('path');

// Configurar ruta de ffmpeg
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const inputVideo = 'public/videos/seguridad.mp4';
const outputDir = 'public/videos';

// Verificar que existe el video original
if (!fs.existsSync(inputVideo)) {
  console.error('❌ Error: No se encontró el video original en:', inputVideo);
  process.exit(1);
}

// Obtener tamaño del video original
const originalStats = fs.statSync(inputVideo);
const originalSizeMB = (originalStats.size / (1024 * 1024)).toFixed(2);

console.log('🎬 Iniciando optimización de video...\n');
console.log(`📹 Video original: ${inputVideo}`);
console.log(`📊 Tamaño original: ${originalSizeMB} MB\n`);

// Configuraciones para cada versión
const configs = [
  {
    name: 'Mobile',
    output: path.join(outputDir, 'seguridad-mobile.mp4'),
    size: '854x480',
    videoBitrate: '500k',
    audioBitrate: '96k',
    crf: 28,
  },
  {
    name: 'Tablet',
    output: path.join(outputDir, 'seguridad-tablet.mp4'),
    size: '1280x720',
    videoBitrate: '1000k',
    audioBitrate: '128k',
    crf: 26,
  },
  {
    name: 'Desktop',
    output: path.join(outputDir, 'seguridad-desktop.mp4'),
    size: '1920x1080',
    videoBitrate: '1500k',
    audioBitrate: '128k',
    crf: 24,
  },
];

// Función para comprimir un video
function compressVideo(config) {
  return new Promise((resolve, reject) => {
    console.log(`\n🔄 Procesando versión ${config.name}...`);
    console.log(`   Resolución: ${config.size}`);
    console.log(`   Bitrate video: ${config.videoBitrate}`);
    console.log(`   CRF: ${config.crf}`);

    const startTime = Date.now();

    ffmpeg(inputVideo)
      .size(config.size)
      .videoBitrate(config.videoBitrate)
      .audioBitrate(config.audioBitrate)
      .audioCodec('aac')
      .videoCodec('libx264')
      .outputOptions([
        `-crf ${config.crf}`,
        '-preset slow',
        '-profile:v main',
        '-movflags +faststart',
        '-pix_fmt yuv420p',
      ])
      .on('start', (commandLine) => {
        console.log('   Comando FFmpeg:', commandLine.substring(0, 100) + '...');
      })
      .on('progress', (progress) => {
        if (progress.percent) {
          process.stdout.write(`\r   Progreso: ${progress.percent.toFixed(1)}%`);
        }
      })
      .on('end', () => {
        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(1);

        if (fs.existsSync(config.output)) {
          const stats = fs.statSync(config.output);
          const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
          const reduction = (((originalStats.size - stats.size) / originalStats.size) * 100).toFixed(1);

          console.log(`\n   ✅ Completado en ${duration}s`);
          console.log(`   📦 Tamaño: ${sizeMB} MB (reducción: ${reduction}%)`);
          console.log(`   📁 Guardado en: ${config.output}`);
        }

        resolve();
      })
      .on('error', (err) => {
        console.log(`\n   ❌ Error: ${err.message}`);
        reject(err);
      })
      .save(config.output);
  });
}

// Función para generar poster
function generatePoster() {
  return new Promise((resolve, reject) => {
    const posterOutput = path.join(outputDir, 'seguridad-poster.jpg');

    console.log('\n\n📸 Generando poster del video...');

    ffmpeg(inputVideo)
      .screenshots({
        timestamps: ['00:00:02'],
        filename: 'seguridad-poster.jpg',
        folder: outputDir,
        size: '1920x1080',
      })
      .on('end', () => {
        if (fs.existsSync(posterOutput)) {
          const stats = fs.statSync(posterOutput);
          const sizeKB = (stats.size / 1024).toFixed(2);
          console.log(`   ✅ Poster generado: ${sizeKB} KB`);
          console.log(`   📁 Guardado en: ${posterOutput}`);
        }
        resolve();
      })
      .on('error', (err) => {
        console.log(`   ❌ Error: ${err.message}`);
        reject(err);
      });
  });
}

// Procesar todos los videos secuencialmente
async function optimizeAllVideos() {
  try {
    // Comprimir cada versión
    for (const config of configs) {
      await compressVideo(config);
    }

    // Generar poster
    await generatePoster();

    // Resumen final
    console.log('\n\n✨ ¡Optimización completada con éxito!\n');
    console.log('📊 Resumen de archivos generados:');
    console.log('─'.repeat(60));

    let totalSaved = originalStats.size;

    configs.forEach((config) => {
      if (fs.existsSync(config.output)) {
        const stats = fs.statSync(config.output);
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
        const reduction = (((originalStats.size - stats.size) / originalStats.size) * 100).toFixed(1);
        console.log(`${config.name.padEnd(10)} | ${sizeMB.padStart(6)} MB | -${reduction}%`);
        totalSaved = Math.min(totalSaved, stats.size);
      }
    });

    const posterPath = path.join(outputDir, 'seguridad-poster.jpg');
    if (fs.existsSync(posterPath)) {
      const stats = fs.statSync(posterPath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      console.log(`Poster     | ${sizeKB.padStart(6)} KB`);
    }

    console.log('─'.repeat(60));

    const savedMB = ((originalStats.size - totalSaved) / (1024 * 1024)).toFixed(2);
    const savedPercent = (((originalStats.size - totalSaved) / originalStats.size) * 100).toFixed(1);

    console.log(`\n💾 Ahorro total (mobile): ${savedMB} MB (${savedPercent}%)`);
    console.log(`\n✅ Los videos optimizados están listos para usar.`);
    console.log('🚀 Recarga tu aplicación para ver los cambios.\n');

  } catch (error) {
    console.error('\n❌ Error durante la optimización:', error.message);
    process.exit(1);
  }
}

// Ejecutar
optimizeAllVideos();
