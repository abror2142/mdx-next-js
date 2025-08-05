'use client'

import { ThemeProvider } from "next-themes";
import "./globals.css";
import { TreeProvider } from "@/contexts/TreeContext";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex">
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <TreeProvider>
            {children} 
          </TreeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
