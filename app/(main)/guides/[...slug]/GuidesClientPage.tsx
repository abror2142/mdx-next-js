'use client'

import { Preview } from '@/app/(dashboard)/admin/editor/Preview'
import { useTree } from '@/contexts/TreeContext'
import findFileIdByslug from '../../_utils/findFileIdByslug'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function GuidesClientPage({ segments }: {segments: Array<string>} ) {
  const [content, setContent] = useState<string | null | undefined>(undefined);

  const { tree } = useTree();
  const match = findFileIdByslug(segments, tree);

  const fetchContent = async (id: string | number) => {
    try {
      const response = await axios.get(`/api/articles/${id}`)
      setContent(response.data?.content);
    } catch {
      console.log(segments)
      setContent(null);
    }
  }

  useEffect(() => {
    if(match) {
        fetchContent(match.id);
    } else {
        setContent(null);
    }
  }, [match])

  return (
    <>
      {
        content === undefined 
        ? <p>Loading ... </p>
        : content === null 
          ? <p>File Not Found</p>
          : <article className="prose m-5 dark:prose-invert max-w-5xl">
            <Preview source={content} />
          </article>
      }
    </>
  )
}
