import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { readFileSync } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from 'fs'
import TreeNode from "@/types/TreeNode";

export const GET = async () => {
    try {
        const orderFilePath = path.join(process.cwd(), 'public', 'config', 'order.json');
        const content = readFileSync(orderFilePath, 'utf-8');
        const session = await getServerSession(authOptions);

        const data: TreeNode[] = JSON.parse(content);
        const responseData = session
          ? data
          : data.filter(item => item?.data?.published);
        return new Response(JSON.stringify(responseData), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: 'Unable to read directory', details: error.message }), { status: 500 });
  }
}

async function writeHandler(item: TreeNode) {
  const filePath = path.join(process.cwd(), 'public', 'config', 'order.json')

  try {
    const fileContents = await fs.readFile(filePath, 'utf8')
    const items = JSON.parse(fileContents)

    items.push(item)
    await fs.writeFile(filePath, JSON.stringify(items, null, 2), 'utf8')

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
        await writeHandler(newItem)
        return NextResponse.json({ Message: "Folder created!", status: 201});
    } catch (error) {
        console.log("Error", error);
        return NextResponse.json({ Message: "Folder did not created", status: 400 });
    }
};