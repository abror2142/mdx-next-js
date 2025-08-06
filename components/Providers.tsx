"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { TreeProvider } from "@/contexts/TreeContext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="system">
      <SessionProvider>
        <TreeProvider>
          {children}
        </TreeProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}