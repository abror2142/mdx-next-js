'use client'

import { NodeContextProvider } from "@/app/(main)/_contexts/NodeContext";
import Header from "@/app/(main)/_components/Header";
import UserFileTree from "@/app/(main)/_components/file-tree/UserFileTree";
import Footer from "@/app/(main)/_components/Footer";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NodeContextProvider>
      <div className="grow-1 flex flex-col gap-0 bg-custom text-custom">
        <Header/>
        <div className="grow-1 flex">
            <UserFileTree />
            <div className="grow-1">
              {children} 
            </div>
        </div>
        <Footer />
      </div>
    </NodeContextProvider>
  );
}
