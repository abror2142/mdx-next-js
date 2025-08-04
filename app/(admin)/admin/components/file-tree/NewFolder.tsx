
import { v4 } from "uuid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { CustomData } from "@/types/types";
import { useTree } from "@/context/TreeContext";
import { createFile } from "./NewFile";
import { useRouter } from "next/navigation";

type NewFolderProps = {
    selectedItem: NodeModel<CustomData> | null;
};

function NewFolder ({ selectedItem }: NewFolderProps) {
    const { syncTree, tree } = useTree();
    const router = useRouter();

    const handleClick = async () => {
        const newFolder: NodeModel<CustomData> = {
            id: v4(),
            parent: selectedItem?.id ?? 0,
            text: "",
            droppable: true,
            data: {
                new: true,
                url: "",
                published: true
            }
        }
        
        try {
            const newTree = [...tree, newFolder];  
            const response = await syncTree(newTree);
            await createFile("", newFolder.id);            
            if(response.status == 200) {
                router.push(`/admin/editor?id=${newFolder.id}`);
            }
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div>
            <button 
                className={`text-blue-400 text-base hover:text-blue-500`}
                onClick={handleClick}
            ><FontAwesomeIcon icon={faFolderPlus} /></button>
        </div>

    )
}

export default NewFolder;