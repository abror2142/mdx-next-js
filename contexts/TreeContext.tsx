'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import TreeNode from '@/types/TreeNode';
import axios, { AxiosResponse } from 'axios';

type TreeContextType = {
    tree: TreeNode[];
    setTree: React.Dispatch<React.SetStateAction<TreeNode[]>>;
    loading: boolean;
    syncTree: (newTree?: TreeNode[]) => Promise<AxiosResponse>;
};

const TreeContext = createContext<TreeContextType | undefined>(undefined);

export function TreeProvider({ children }: { children: ReactNode }) {
    const [tree, setTree] = useState<TreeNode[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchTreeData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/menu');
            setTree(response.data)
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false);
        }
    }
    
    const syncTree = async (newTree?: TreeNode[]) => {
        setLoading(true);
        try {
            if(newTree && newTree.length > 0) {
                setTree(newTree);
            }
            const syncingTree = newTree ? newTree : tree;
            const response = await axios.post('/api/menu/sync', JSON.stringify(syncingTree));
            return response;
        } catch(e) {
            console.log(e)
            throw e;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTreeData();
    }, [])

    if(!tree) {
        return <p>Fetching...</p>
    }

    return (
        <TreeContext.Provider value={{ tree, setTree, loading, syncTree }}>
            {children}
        </TreeContext.Provider>
    );
}

export function useTree() {
  const context = useContext(TreeContext);
  if (!context) throw new Error('useTreeContext must be used within a TreeProvider');
  return context;
}
