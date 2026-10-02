import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://kendaraya.github.io',
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'si',
        locales: {
          si: 'si',
          en: 'en',
        },
      },
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date(),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'si',
    locales: ['si', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
