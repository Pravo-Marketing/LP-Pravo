import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Gera uma versão 100% estática em /out, compatível com GitHub Pages.
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
