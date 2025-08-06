import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ Message: "Invalid file", status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + file.name.replaceAll(" ", "_");
  try {
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    );
    return NextResponse.json({ Message: "File uploaded", status: 201, path: "/uploads/" + filename});
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json({ Message: "Upload did not completed", status: 500 });
  }
};