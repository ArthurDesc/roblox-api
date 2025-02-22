import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MainSidebar } from "@/components/sidebar/MainSidebar";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Roblox API Explorer",
  description: "Explorez et intégrez l'API Roblox facilement",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} antialiased`}>
        <SidebarProvider defaultOpen>
          <div className="flex min-h-screen">
            <MainSidebar />
            <SidebarInset>
              <div className="flex h-16 items-center border-b px-6">
                <SidebarTrigger>
                  <span className="sr-only">Toggle Sidebar</span>
                </SidebarTrigger>
              </div>
              <div className="p-6">
                {children}
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
