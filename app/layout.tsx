'use client'

import { ThemeProvider } from "next-themes";
import "./globals.css";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex">
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          {children} 
        </ThemeProvider>
      </body>
    </html>
  );
}
