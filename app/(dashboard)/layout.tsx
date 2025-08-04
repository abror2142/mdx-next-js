'use client'

import { SessionProvider } from 'next-auth/react';
import { AdminSidebar } from './_components/AdminSidebar';
import { TreeProvider } from '@/app/(dashboard)/_contexts/TreeContext';

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
