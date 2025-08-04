import { use } from 'react'
import GuidePageClient from './GuidePageClient'


type ParamsShape = { id?: string | number }

export default function GuidePage({
  params,
}: {
  params: Promise<ParamsShape>
}) {
  const { id } = use(params)

  return <GuidePageClient id={id ?? ''} />
}