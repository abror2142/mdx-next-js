import { NodeModel } from "@minoru/react-dnd-treeview";
import { CustomData } from "../../../../types/CustomData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useNode } from "@/app/(main)/_contexts/NodeContext";

type Props = {
  node: NodeModel<CustomData>;
  depth: number;
  isOpen: boolean;
  onToggle: (id: NodeModel["id"]) => void;
  tree: NodeModel<CustomData>[];
};

export const CustomNode: React.FC<Props> = (props) => {
  const indent = props.depth * 24;
  const { setSelectedNode, selectedNode } = useNode();
  const router = useRouter();
  
  const makeHierarchy = (parentId: string | number): string => {
    const parent = props.tree.find(node => node.id === parentId);
    if(parent && parent.droppable) {
      return `${makeHierarchy(parent.parent)}/${parent.text.replaceAll(' ', '-').toLowerCase()}`
    }
    return ''
  }
  const hierarchy = makeHierarchy(props.node.parent) + `/${props.node.data?.url}`


  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNode(props.node);
    router.push(`/guides/${hierarchy}`);
    console.log(props.isOpen);

    if(props.node.droppable) 
      props.onToggle(props.node.id);
  }



  return (
    <div
      className={`tree-node rounded-sm flex text-sm `}
      style={{ paddingInlineStart: indent }}
      onClick={handleClick}
    >
      <div className={`grow-1 flex gap-1 items-center py-1 px-2 rounded-sm ${selectedNode?.id == props.node.id ? 'component-bg-custom' : ''}`}>
        {
          props.node.droppable 
          && <div
              className={`expandIconWrapper text-[11px] ${
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
        <div>
          <p>{props.node.text}</p>
        </div>
      </div>
    </div>
  );
};
