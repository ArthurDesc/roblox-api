import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MainSidebar } from "@/components/sidebar/MainSidebar";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Footer } from "@/components/layout/Footer";
import FreeRobuxButton from "@/components/ui/FreeRobuxButton";

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
    <html lang="fr" className="h-full" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased min-h-screen`}>
        <div className="w-full max-w-[100vw] overflow-hidden">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider
              style={{
                "--sidebar-width": "16rem",
              } as React.CSSProperties}
            >
              <MainSidebar />
              <SidebarInset>
                <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 px-4">
                  <SidebarTrigger />
                  <div className="fixed top-4 right-4 z-50">
                    <FreeRobuxButton />
                  </div>
                </header>
                <main className="flex-1">
                  <div className="flex-1 space-y-4 p-4">
                    {children}
                  </div>
                </main>
              </SidebarInset>
            </SidebarProvider>
            <Footer />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
