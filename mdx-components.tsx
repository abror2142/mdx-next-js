import type { MDXComponents } from 'mdx/types'
import YouTube from './components/mdx/YouTube'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    YouTube
  }
}