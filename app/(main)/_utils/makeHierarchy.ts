import MakeHierarchyProps from "../_types/MakeHierarchyType";
import { MakeHierarchyUtilProps } from "../_types/MakeHierarchyType";

const makeHierarchyUtil = ({parentId, tree}: MakeHierarchyUtilProps): string => {
    const parent = tree.find(node => node.id === parentId);
    if(parent && parent.droppable) {
      return `${makeHierarchyUtil({parentId: parent.parent, tree})}/${parent.text.replaceAll(' ', '-').toLowerCase()}`
    }
    return ''
}

export default ({node, tree, parentId}: MakeHierarchyProps) => makeHierarchyUtil({parentId, tree}) + `/${node.data?.url}`;