import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MainSidebar } from "@/components/sidebar/MainSidebar";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "iZi Robux",
  description: "Explorez et intégrez l'API Roblox facilement",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className={`${inter.variable} antialiased min-h-screen`}>
        <SidebarProvider
          style={{
            "--sidebar-width": "16rem",
          } as React.CSSProperties}
        >
          <MainSidebar />
          <SidebarInset>
            <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
              <SidebarTrigger />
              <Separator orientation="vertical" className="h-4" />
              <div className="flex-1">iZi Robux</div>
            </header>
            <main className="flex-1">
              <div className="flex-1 space-y-4 p-4">
                {children}
              </div>
            </main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
