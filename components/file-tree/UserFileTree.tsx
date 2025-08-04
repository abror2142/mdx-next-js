'use client'

import { CustomNode } from "./CustomNode";
import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import {
  Tree,
  NodeModel,
  MultiBackend,
  getBackendOptions
} from "@minoru/react-dnd-treeview";
import { CustomData } from "../../types/types";
import axios from "axios";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faHome, faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNode } from "@/context/NodeContext";
import { faCaretSquareLeft, faCaretSquareRight } from "@fortawesome/free-regular-svg-icons";

function UserFileTree () {
    const [treeData, setTreeData] = useState<NodeModel<CustomData>[]>([]);
    const { selectedNode, setSelectedNode } = useNode();
    const [isOpen, setIsOpen] = useState(true);

    const fetchTreeData = async () => {
        try {
            const response = await axios.get('/api/menu');
            setTreeData(response.data)
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchTreeData();
    }, [])

    return (
        <>
            {
                isOpen
                ? <div className="grow-1 flex flex-col justify-between gap-1 max-w-65 w-full p-4 border-r border-custom">
                    <div className="grow-1 flex flex-col gap-1">
                        <Link 
                            onClick={() => setSelectedNode(null)} 
                            href={'/'} 
                            className={`text-sm py-1 px-2 rounded-sm flex items-center gap-2 ${selectedNode === null && 'component-bg-custom'}`}
                        >
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[12px] text-blue-300"/>Home
                        </Link>
                        <>
                            <p className="text-md font-semibold px-2">Guides</p>
                            <DndProvider backend={MultiBackend} options={getBackendOptions()}>
                                <Tree
                                    tree={treeData}
                                    rootId={0}
                                    render={(node, { depth, isOpen, onToggle }) => (
                                        <CustomNode
                                            node={node}
                                            depth={depth}
                                            isOpen={isOpen}
                                            tree={treeData}
                                            onToggle={onToggle}
                                        />
                                    )}
                                    onDrop={() => {}}
                                    classes={{
                                        root: 'root',
                                        draggingSource: 'draggingSource',
                                        placeholder: 'placeholderContainer'
                                    }}
                                    sort={false}
                                    canDrop={() => false}
                                    canDrag={() => false}
                                    
                                />
                            </DndProvider>
                        </>
                    </div>
                    <div className="flex justify-end">
                        <FontAwesomeIcon icon={isOpen ? faCaretSquareLeft : faCaretSquareRight} onClick={() => setIsOpen(prev => !prev)} className="text-2xl text-end text-blue-400 hover:text-blue-500"/>
                    </div>
                </div>
                : <div className="flex p-4 justify-end flex-col border-r border-gray-300">
                    <FontAwesomeIcon icon={isOpen ? faCaretSquareLeft : faCaretSquareRight} onClick={() => setIsOpen(prev => !prev)} className="text-2xl text-end text-blue-400 hover:text-blue-500"/>
                </div>
            }
        </>
    )
}

export default UserFileTree;