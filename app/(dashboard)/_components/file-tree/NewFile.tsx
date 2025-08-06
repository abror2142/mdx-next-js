import TreeNode from "@/types/TreeNode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";
import { useTree } from "@/contexts/TreeContext";
import axios from "axios";

type NewFolderProps = {
    selectedItem: TreeNode | null;
};

export const createFile = async (content: string, id: string | number) => {
    if (!id) return;

    const formData = new FormData();
    formData.append('content', content);
    formData.append('id', String(id));
    try {
        await axios.post('/api/articles', formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
};

function NewFile ({selectedItem }: NewFolderProps) {
    const router = useRouter();
    const { syncTree, tree } = useTree();

    const handleClick = async () => {
        const newFile: TreeNode = {
            id: v4(),
            parent: selectedItem ? selectedItem.droppable ? selectedItem.id : selectedItem.parent : 0,
            text: "",
            droppable: false,
            data: {
                new: true,
                url: "",
                published: true
            }
        }
        try {
            const newTree = [...tree, newFile];   
            const response = await syncTree(newTree);
            await createFile("", newFile.id);            
            if(response.status == 200) {
                router.push(`/admin/editor?id=${newFile.id}`);
            }
        } catch(e) {
            console.log(e);
        }
    }

    return (  
        <div>
            <button 
                className={`text-base text-blue-400 hover:text-blue-500 ${selectedItem ? '' : ''}`}
                onClick={handleClick}
            ><FontAwesomeIcon icon={faFileCirclePlus} /></button>
        </div>
    )
}

export default NewFile;