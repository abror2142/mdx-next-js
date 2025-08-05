import { MakeHierarchyProps, MakeHierarchyUtilProps } from "../_types/utilTypes";

const makeHierarchyUtil = ({parentId, tree}: MakeHierarchyUtilProps): string => {
    const parent = tree.find(node => node.id === parentId);
    if(parent && parent.droppable) {
      return `${makeHierarchyUtil({parentId: parent.parent, tree})}/${parent.text.replaceAll(' ', '-').toLowerCase()}`
    }
    return ''
}

/* 
    makeHierarchy -- used to make full path of a file/node using its' id and parentId.
  The goal of having full path is to make the url readable for the user.
  This full path is destructured to get the id of the file later on.
  e.g. (id) abc-23-vkkl => (url to show) => /guides/faq/why-we-use-an-account
*/
export default ({node, tree, parentId}: MakeHierarchyProps) => makeHierarchyUtil({parentId, tree}) + `/${node.data?.url}`;