import { NodeModel } from "@minoru/react-dnd-treeview";
import { CustomData } from "@/types/CustomData";

export default interface MakeHierarchyProps {
    parentId: string | number;
    tree: NodeModel<CustomData>[];
    node: NodeModel<CustomData>;
}

export interface MakeHierarchyUtilProps {
    parentId: string | number;
    tree: NodeModel<CustomData>[];
}