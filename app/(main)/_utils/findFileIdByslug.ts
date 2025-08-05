'use client'

import { FindFiledIdType } from "../_types/utilTypes"
import { NodeModel } from "@minoru/react-dnd-treeview"
import { CustomData } from "@/types/CustomData"

function findChildBySlug({ tree, parentId, slug }: FindFiledIdType) {
  return tree.find(item => item.parent === parentId && item.data?.url === slug )
}

/*
    findFileBySlug -- is used to find find file data from tree using its slug.
  Slug is not just the file name in cleaned format, but it also includes parents hierarchy
  which is made by makeHierarchy function. Tree is entered one segment (folder) of the url at a time
  until it reaches the final match which is the file data in this tree.
  Then match is returned with possiple undefined value in case the hierarchy doesn't match.
*/
export default (segments: Array<string>, tree: NodeModel<CustomData>[]) => {
  let parentId: string|number = 0
  let match: (typeof tree)[0] | undefined
  
  for (const rawSeg of segments) {
      const slug = decodeURIComponent(rawSeg);
      match = findChildBySlug({tree, parentId, slug})
      if (!match) break
      parentId = match.id
  }
  return match;
}