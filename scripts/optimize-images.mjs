#!/usr/bin/env node
import imagemin from 'imagemin'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminWebp from 'imagemin-webp'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = dirname(__dirname)
const publicDir = join(projectRoot, 'public')

console.log('🖼️  Starting image optimization...\n')

// Optimize JPEG images
console.log('📦 Optimizing JPEG images...')
const jpegResult = await imagemin([join(publicDir, '*.{jpg,jpeg}')], {
  destination: publicDir,
  plugins: [
    imageminMozjpeg({
      quality: 80,
      progressive: true,
    }),
  ],
})

if (jpegResult.length > 0) {
  jpegResult.forEach(file => {
    console.log(`✓ Optimized: ${file}`)
  })
} else {
  console.log('No JPEG files found or already optimized')
}

// Create WebP versions
console.log('\n🌐 Creating WebP versions...')
const webpResult = await imagemin([join(publicDir, '*.{jpg,jpeg,png}')], {
  destination: publicDir,
  plugins: [
    imageminWebp({
      quality: 80,
    }),
  ],
})

if (webpResult.length > 0) {
  webpResult.forEach(file => {
    console.log(`✓ Created WebP: ${file}`)
  })
} else {
  console.log('No images to convert to WebP')
}

// Show file size comparison
console.log('\n📊 File Size Comparison:\n')
const profileJpg = join(publicDir, 'profile.jpg')
const profileWebp = join(publicDir, 'profile.webp')

if (fs.existsSync(profileJpg)) {
  const jpgSize = fs.statSync(profileJpg).size
  console.log(`profile.jpg:  ${(jpgSize / 1024).toFixed(2)} KiB`)
}

if (fs.existsSync(profileWebp)) {
  const webpSize = fs.statSync(profileWebp).size
  console.log(`profile.webp: ${(webpSize / 1024).toFixed(2)} KiB`)
}

console.log('\n✅ Image optimization complete!')
console.log('\n💡 Tip: Update your HTML to use WebP with fallback:')
console.log(`
<picture>
  <source srcset="/profile.webp" type="image/webp" fetchpriority="high" />
  <img src="/profile.jpg" alt="Profile photo" loading="eager" decoding="async" />
</picture>
`)
