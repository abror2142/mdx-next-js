import { NextResponse, NextRequest } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

async function syncHandler(item: unknown) {
  const filePath = path.join(process.cwd(), 'public', 'config', 'order.json')

  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const serial = JSON.stringify(item, null, 2)
    await writeFile(filePath, serial, 'utf8')
    return;
  } catch (err) {
    throw err;
  }
}

export const POST = async (req: NextRequest) => {
    const newItem = await req.json();

    if (!newItem || typeof newItem !== 'object') {
      return NextResponse.json({ error: 'Invalid item in request body' }, { status: 400 });
    }

    try {
        await syncHandler(newItem)
        return NextResponse.json({ Message: "Folder created!", status: 201});
    } catch (error) {
        console.log("Error", error);
        return NextResponse.json({ Message: "Folder did not created", status: 400 });
    }
};