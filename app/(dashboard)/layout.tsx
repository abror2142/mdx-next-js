import { AdminSidebar } from './_components/AdminSidebar';
import { Suspense } from 'react';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="grow-1 flex bg-custom text-custom">
        <AdminSidebar />
        <div className="flex flex-col flex-1">
          {children}
        </div>
      </div>
    </Suspense>
  );
}
