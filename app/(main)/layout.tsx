'use client'

import { NodeContextProvider } from "@/context/NodeContext";
import Header from "@/components/Header";
import UserFileTree from "@/components/file-tree/UserFileTree";
import Footer from "@/components/Footer";

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
