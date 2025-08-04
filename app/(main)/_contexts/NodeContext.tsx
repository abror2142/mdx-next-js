'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { NodeModel } from '@minoru/react-dnd-treeview';
import { CustomData } from '@/types/CustomData';

type NodeContextType = {
   selectedNode: NodeModel<CustomData> | null;
   setSelectedNode: React.Dispatch<React.SetStateAction<NodeModel<CustomData> | null>>;
};

const NodeContext = createContext<NodeContextType | undefined>(undefined);

export function NodeContextProvider({ children }: { children: ReactNode }) {
    const [selectedNode, setSelectedNode] = useState<NodeModel<CustomData> | null>(null);

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
