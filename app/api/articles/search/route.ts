import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { readFile } from 'fs/promises';
import fs from 'fs';
import TreeNode from '@/types/TreeNode';
import sanitizeHtml from 'sanitize-html';
import MatchType from '@/app/(main)/_types/MatchType';

function escapeRegExp(term: string): string {
  return term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightWordContainingTerm(text: string, term: string): string {
  const escaped = escapeRegExp(term);
  const regex = new RegExp(`\\b[\\w-]*${escaped}[\\w-]*\\b`, 'gi');

  return text.replace(regex, (match) => `<b>${match}</b>`);
}

const takeScreenshot = (text: string, inTitle: boolean, term: string) => {
  let screenshot = ''; 
  if (inTitle) {
    screenshot =  `… ${highlightWordContainingTerm(text.toLowerCase(), term)} …`;
  } else {
    const index = text.toLowerCase().indexOf(term);
    if (index !== -1) {
      const start = Math.max(0, index - 15);
      const end = Math.min(text.length, index + term.length + 30);
      const windowText = text.slice(start, end);
      screenshot = `… ${highlightWordContainingTerm(windowText, term)} …`;
    } else {
      screenshot = text;
    }
  }
  return screenshot;
}

export async function GET(
  request: NextRequest
) {
    const { searchParams } = new URL(request.url);
    const term = searchParams.get("term");
    let matches: MatchType[] = [];

    if (!term) {
        return new Response("Search term is required", { status: 400 });
    }

  // First check if the term is provided in the order.json file
  const orderFilePath = path.join(process.cwd(), 'public', 'config', 'order.json');
    const orderData = JSON.parse(await readFile(orderFilePath, 'utf8'));
    const orderMatches = orderData.filter((item: { text: string }) =>
        item.text.toLowerCase().includes(term.toLowerCase())
    );
    orderMatches.forEach((match: TreeNode) => {
        const screenshot = takeScreenshot(match.text, true, term);
        matches.push({
            ...match,
            screenshot,
        });
    }); 

  // If no matches found in order.json, search in the guides directory
  const guidesDirectory = path.join(process.cwd(), 'public', 'guides');
  const guideFiles = await fs.promises.readdir(guidesDirectory);

  const guideMatches = (await Promise.all(
      guideFiles.map(async (file) => {
          const filePath = path.join(guidesDirectory, file);
          const fileContent = await fs.promises.readFile(filePath, 'utf8');
          if (fileContent.toLowerCase().includes(term.toLowerCase())) {
              return { title: file.replace('.mdx', ''), url: `/guides/${file}`, screenshot: takeScreenshot(sanitizeHtml(fileContent, { allowedTags: [], allowedAttributes: {} }), false, term) };
          }
      })
  )).filter(Boolean);

  if( guideMatches.length > 0 ){
    guideMatches.map(match => {
        const orderMatch = orderData.find((item: TreeNode) => item.id == match?.title);
        if (orderMatch && matches.find(match => match.id == orderMatch.id) === undefined) {
            matches.push({...orderMatch, screenshot: match?.screenshot});
        }
    });
  }
  return NextResponse.json(matches);
}