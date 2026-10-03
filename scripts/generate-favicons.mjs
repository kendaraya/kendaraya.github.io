import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.resolve(projectRoot, 'public');

// High-contrast, brand-aligned Sinhala astrology Kendra chart favicon SVG
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4A0505"/>
      <stop offset="100%" stop-color="#2D0000"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="50%" stop-color="#EAB308"/>
      <stop offset="100%" stop-color="#CA8A04"/>
    </linearGradient>
  </defs>
  <!-- Brand Crimson Container -->
  <rect width="100" height="100" rx="22" fill="url(#bgGrad)" stroke="#6D0808" stroke-width="2"/>
  <!-- Outer Sacred Geometry Ring -->
  <circle cx="50" cy="50" r="38" fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-opacity="0.9"/>
  <!-- Central Diamond House (Lagna / Kendra) -->
  <polygon points="50,18 82,50 50,82 18,50" fill="none" stroke="url(#goldGrad)" stroke-width="4.5" stroke-linejoin="round"/>
  <!-- Internal House Division Rays -->
  <line x1="28" y1="28" x2="72" y2="72" stroke="url(#goldGrad)" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="72" y1="28" x2="28" y2="72" stroke="url(#goldGrad)" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Auspicious Central Bindu -->
  <circle cx="50" cy="50" r="6" fill="#FDE047" stroke="#2D0000" stroke-width="1.5"/>
</svg>`;

// Update public/favicon.svg
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent, 'utf-8');
console.log('Updated public/favicon.svg');

// Google Search Favicon Guidelines: Multiples of 48px square (48x48, 96x96, etc.)
const targets = [
  { file: 'favicon-48x48.png', size: 48 },
  { file: 'favicon-96x96.png', size: 96 },
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'favicon-192x192.png', size: 192 },
  { file: 'favicon-512x512.png', size: 512 }
];

async function generateFavicons() {
  for (const target of targets) {
    const outputPath = path.join(publicDir, target.file);
    await sharp(Buffer.from(svgContent))
      .resize(target.size, target.size)
      .png({ compressionLevel: 9 })
      .toFile(outputPath);
    console.log(`Generated: ${target.file} (${target.size}x${target.size}px)`);
  }
}

generateFavicons()
  .then(() => console.log('All favicons successfully generated!'))
  .catch((err) => {
    console.error('Error generating favicons:', err);
    process.exit(1);
  });
