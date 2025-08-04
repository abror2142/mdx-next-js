import React from "react";
import { NodeModel } from "@minoru/react-dnd-treeview";

type Props = {
  node: NodeModel;
  depth: number;
};

export const Placeholder: React.FC<Props> = (props) => {
  const left = props.depth * 24;
  return <div className="placeholder" style={{ left }}></div>;
};
