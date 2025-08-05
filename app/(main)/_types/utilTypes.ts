import { NodeModel } from "@minoru/react-dnd-treeview";
import { CustomData } from "@/types/CustomData";

export interface FindFiledIdType {
  tree: NodeModel<CustomData>[];
  parentId: string|number;
  slug: string;
}

export interface MakeHierarchyProps {
    parentId: string | number;
    tree: NodeModel<CustomData>[];
    node: NodeModel<CustomData>;
}

export interface MakeHierarchyUtilProps {
    parentId: string | number;
    tree: NodeModel<CustomData>[];
}