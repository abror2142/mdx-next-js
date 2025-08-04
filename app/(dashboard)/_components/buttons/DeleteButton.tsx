import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTree } from "@/app/(dashboard)/_contexts/TreeContext";
import axios from "axios";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { CustomData } from "@/types/CustomData";
import { useState } from "react";
import { useRouter } from "next/navigation";

type NewFolderProps = {
    node: NodeModel<CustomData>;
    iconOnly?: boolean;
};

function DeleteButton ({ node, iconOnly }: NewFolderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { syncTree, tree } = useTree();
    const router = useRouter()

    const filterOutNode = (item: NodeModel<CustomData>): NodeModel<CustomData>[] => {
        if (item.droppable) {
            const children = tree.filter(treeNode => treeNode.parent === item.id);
            return [item, ...children.flatMap(child => filterOutNode(child))];
        } else {
            return [item];
        }
    }

    const requestDelete = async (node: NodeModel<CustomData>) => {
        try {
            await axios.delete(`/api/articles/${node.id}`);
        } catch(e) {
            console.log(e);
        }
    }

    const handleDelete = async (item: NodeModel<CustomData>) => {
        const items: NodeModel<CustomData>[] = filterOutNode(item);

        items.forEach(async item => {
            await requestDelete(item);
        })

        const newTree = tree.filter(item => items.filter(node => node.id == item.id).length == 0);
        await syncTree(newTree);
        router.push('/admin');
    }

    return ( 
        <>
            {
                isOpen
                ? <div className="fixed inset-0  bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="flex flex-col gap-4 p-6 w-sm bg-blue-200 rounded-md">
                        <p className="text-center text-xl font-medium">Are you sure to Delete this {node.droppable ? "folder and its all content" : "file"}?</p>
                        <ul className="list-disc pl-8">
                            <li className="text-blue-500 text-base text-nowrap underline text-start ">{node.text}</li>
                        </ul>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(node)}
                                className="px-4 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                : <>
                    {
                        iconOnly
                        ? <button 
                            className={`text-base text-red-500 hover:text-red-600 cursor-pointer`}
                            onClick={() => setIsOpen(true)}
                        ><FontAwesomeIcon icon={faTrashCan} /></button>
                        : <button 
                            onClick={() => setIsOpen(true)} 
                            className="px-3 py-1.5 rounded-sm bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
                        >
                            <p>Delete</p>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    }
                </>
            }
        </> 
    )
}

export default DeleteButton;