'use client'

import { SessionProvider } from 'next-auth/react';
import { AdminSidebar } from './admin/components/AdminSidebar';
import { TreeProvider } from '@/context/TreeContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    
  return (
    <TreeProvider>
        <div className="grow-1 flex bg-custom text-custom">
            <AdminSidebar />
            <div className="flex flex-col flex-1">
                <SessionProvider>
                    {children}
                </SessionProvider>
            </div>
        </div>
    </TreeProvider>
  );
}
