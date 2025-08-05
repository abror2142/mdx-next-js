import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { readFile, unlink } from 'fs/promises';
import { existsSync } from 'fs';

export async function GET(
  context: { params: { id: string } }
) {
  const { id } = await Promise.resolve(context.params);

  const filePath = path.join(process.cwd(), 'public', 'guides', `${id}.mdx`);

  if (!existsSync(filePath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  const fileContent = await readFile(filePath, 'utf8');

  return NextResponse.json({ content: fileContent });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const filePath = path.join(process.cwd(), 'public', 'guides', `${id}.mdx`);

  try {
    await unlink(filePath);
    return NextResponse.json({ message: 'File deleted successfully' });
  } catch (err) {
    console.error('Error deleting file:', err);
    return NextResponse.json({ error: 'File not found or could not be deleted' }, { status: 404 });
  }
}