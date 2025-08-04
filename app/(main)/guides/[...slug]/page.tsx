import fs from 'fs/promises'
import path from 'path'
import { notFound } from 'next/navigation'
import { Preview } from '@/app/(admin)/admin/editor/Preview'

async function loadTree() {
  const json = await fs.readFile(path.join(process.cwd(),'public', 'config', 'order.json'),'utf8')
  return JSON.parse(json) as Array<{
    id: string|number, parent: string|number,
    text: string, droppable?: boolean, data?: any
  }>
}

function findChildBySlug(
  items: Array<any>,
  parentId: string|number,
  slug: string
) {
  return items.find(
    item =>
      item.parent === parentId &&
      item.data.url === slug
  )
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const segments = params.slug
  
  const items = await loadTree()

  let currentParent: string|number = 0
  let match: (typeof items)[0] | undefined

  for (const rawSeg of segments) {
    const seg = decodeURIComponent(rawSeg);
    match = findChildBySlug(items, currentParent, seg)
    if (!match) break
    currentParent = match.id
  }

  console.log('Segments:', params)
  if (!match) {
    notFound()   
  }
  
  const id = match.id
  const filePath = path.join(process.cwd(), 'public', 'guides', `${id}.mdx`)
  
  let content: string
  try {
    content = await fs.readFile(filePath, 'utf8')
  } catch {
    console.log(segments)
    notFound()
  }

  return (
    <article className="prose m-5 dark:prose-invert max-w-5xl">
      <Preview source={content} />
    </article>
  )
}
