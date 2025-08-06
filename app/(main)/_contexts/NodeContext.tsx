'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import TreeNode from '@/types/TreeNode';

type NodeContextType = {
   selectedNode: TreeNode | null;
   setSelectedNode: React.Dispatch<React.SetStateAction<TreeNode | null>>;
};

const NodeContext = createContext<NodeContextType | undefined>(undefined);

export function NodeContextProvider({ children }: { children: ReactNode }) {
    const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

    return (
        <NodeContext.Provider value={{ selectedNode, setSelectedNode }}>
            {children}
        </NodeContext.Provider>
    );
}

export function useNode() {
  const context = useContext(NodeContext);
  if (!context) throw new Error('useTreeContext must be used within a TreeProvider');
  return context;
}
