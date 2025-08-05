'use client'

import { CustomNode } from "./CustomNode";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import {
  Tree,
  MultiBackend,
  getBackendOptions
} from "@minoru/react-dnd-treeview";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useNode } from "../../_contexts/NodeContext";
import { faCaretSquareLeft, faCaretSquareRight } from "@fortawesome/free-regular-svg-icons";
import { useTree } from "@/contexts/TreeContext";

function UserFileTree () {
    const { tree } = useTree();
    const { selectedNode, setSelectedNode } = useNode();
    const [isOpen, setIsOpen] = useState(true);

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
                                    tree={tree}
                                    rootId={0}
                                    render={(node, { depth, isOpen, onToggle }) => (
                                        <CustomNode
                                            node={node}
                                            depth={depth}
                                            isOpen={isOpen}
                                            tree={tree}
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