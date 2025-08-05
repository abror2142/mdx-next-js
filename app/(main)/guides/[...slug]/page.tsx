import GuidesClientPage from './GuidesClientPage'

export default async function Page({ params }: { params: { slug: string[] } }) {
  return (<GuidesClientPage segments={params.slug} />)
}
