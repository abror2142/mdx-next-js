import React from "react";
import TreeNode from "@/types/TreeNode";
import { TypeIcon } from "@/components/shared/TypeIcon";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


type Props = {
  node: TreeNode;
  selectedItem: TreeNode | null;
  depth: number;
  isOpen: boolean;
  onToggle: (id: number | string) => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<TreeNode | null>>;
};

export const NewFolderNode: React.FC<Props> = (props) => {
  const indent = props.depth * 24;
  
  return (
    <div
      className={`tree-node flex`}
      style={{ paddingInlineStart: indent }}
    >
        <div className="border  flex gap-1 items-center rounded-sm py-1 px-2 ">
            {
                props.node.droppable 
                && <div
                    className={`expandIconWrapper text-sm ${
                    props.isOpen ? "isOpen" : ""
                    }`}
                >
                    {
                        props.node.droppable 
                        && <div  className="flex items-center justify-center">
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                    }
                </div>
                }
            {props.node.droppable ? null : <TypeIcon fileType={props.node.data?.fileType} />}
            <div >
                
            </div>
      </div>
    </div>
  );
};
