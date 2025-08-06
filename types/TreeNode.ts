import { NodeModel } from "@minoru/react-dnd-treeview";

export type CustomData = {
  fileType?: string;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
  new?: boolean;
  url?: string;
};

type TreeNode = NodeModel<CustomData>;

export default TreeNode;