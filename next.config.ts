import type { NextConfig } from "next";
import createMDX from '@next/mdx';


/** @type {import('next').NextConfig} */  
const nextConfig: NextConfig = {
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
  options: {
    remarkPlugins: [require('remark-shortcodes')],  
  }
})
 
export default withMDX(nextConfig)