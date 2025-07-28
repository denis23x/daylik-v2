import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import { transformerMetaHighlight } from '@shikijs/transformers';

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'fwctlanacdwbsgiymgll.supabase.co',
      },
    ],
  },
};

/** @type {import('rehype-pretty-code').Options} */
export const shikiOptions = {
  keepBackground: false,
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
  transformers: [transformerMetaHighlight()],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkGfm, remarkToc],
    rehypePlugins: [rehypeSlug, [rehypePrettyCode, shikiOptions]],
  },
});

const withNextIntl = createNextIntlPlugin();

// Merge MDX config with Next.js config, then apply next-intl
export default withNextIntl(withMDX(nextConfig));
