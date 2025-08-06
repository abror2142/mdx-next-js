import TreeNode from "@/types/TreeNode";

export interface FindFiledIdType {
  tree: TreeNode[];
  parentId: string|number;
  slug: string;
}

export interface MakeHierarchyProps {
    parentId: string | number;
    tree: TreeNode[];
    node: TreeNode;
}

export interface MakeHierarchyUtilProps {
    parentId: string | number;
    tree: TreeNode[];
}