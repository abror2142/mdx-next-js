import { NodeModel } from "@minoru/react-dnd-treeview";
import { CustomData } from "@/types/CustomData";

export default interface MatchType extends NodeModel<CustomData> {
    screenshot: string;
}