import GuidesClientPage from "./GuidesClientPage";

export default async function Page(
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  return <GuidesClientPage segments={slug} />
}