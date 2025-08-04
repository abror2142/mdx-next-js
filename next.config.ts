import type { NextConfig } from "next";
import createMDX from '@next/mdx';


/** @type {import('next').NextConfig} */  
const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
};
const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [require('remark-shortcodes')],  
  }
})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)