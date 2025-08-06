import Providers from "@/components/Providers";
import "./globals.css";

export default async function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
