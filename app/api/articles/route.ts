import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();

  const content = formData.get("content");
  const id = formData.get("id");

  if (content === null || !id) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }
  const fullPath = path.join(process.cwd(), "public", 'guides');
  try {
    await writeFile(
      path.join(fullPath, id + '.mdx'),
      content.toString()
    );
    return NextResponse.json({ Message: "Content Saved", status: 201});
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json({ Message: "Content was not saved", status: 500 });
  }
};