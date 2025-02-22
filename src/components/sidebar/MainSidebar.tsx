'use client';

import * as React from 'react';
import { Home, History, Star, Settings, Search, Book, FileText, CreditCard, Bell, LogOut, Moon, Sun, ChevronDown } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTheme } from "next-themes";

interface RobloxUser {
  name: string;
  displayName: string;
  avatarUrl?: string;
}

export function MainSidebar() {
  const router = useRouter();
  const [user, setUser] = useState<RobloxUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          if (!data.error) {
            setUser({
              name: data.name,
              displayName: data.displayName,
              avatarUrl: `https://www.roblox.com/headshot-thumbnail/image?userId=${data.id}&width=420&height=420&format=png`
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogin = () => {
    router.push('/api/auth/roblox');
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      });

      if (response.ok) {
        setUser(null);
        router.refresh(); // Rafraîchir la page pour mettre à jour l'état
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Sidebar variant="floating" collapsible="icon" className="font-[var(--font-anta)] border-r-0">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 font-[var(--font-anta)] text-sm font-medium text-muted-foreground">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip="Home"
                  className="hover:bg-accent/50 transition-colors"
                >
                  <a href="/" className="flex items-center gap-3 px-6 font-[var(--font-anta)]">
                    <Home className="h-4 w-4 text-primary" />
                    <span className="text-foreground">Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip="History"
                  className="hover:bg-accent/50 transition-colors"
                >
                  <a href="/history" className="flex items-center gap-3 px-6 font-[var(--font-anta)]">
                    <History className="h-4 w-4 text-primary" />
                    <span className="text-foreground">History</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip="Favorites"
                  className="hover:bg-accent/50 transition-colors"
                >
                  <a href="/starred" className="flex items-center gap-3 px-6 font-[var(--font-anta)]">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="text-foreground">Favorites</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip="Search"
                  className="hover:bg-accent/50 transition-colors"
                >
                  <a href="/search" className="flex items-center gap-3 px-6 font-[var(--font-anta)]">
                    <Search className="h-4 w-4 text-primary" />
                    <span className="text-foreground">Search</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip="Settings"
                  className="hover:bg-accent/50 transition-colors"
                >
                  <a href="/settings" className="flex items-center gap-3 px-6 font-[var(--font-anta)]">
                    <Settings className="h-4 w-4 text-primary" />
                    <span className="text-foreground">Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-6 font-[var(--font-anta)] text-sm font-medium text-muted-foreground">
            Documentation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip="API Reference"
                  className="hover:bg-accent/50 transition-colors"
                >
                  <a href="/docs/api" className="flex items-center gap-3 px-6 font-[var(--font-anta)]">
                    <Book className="h-4 w-4 text-primary" />
                    <span className="text-foreground">API Reference</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuSub className="ml-4 border-l-2 border-accent/20">
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton 
                      href="/docs/api/getting-started"
                      className="hover:bg-accent/50 transition-colors"
                    >
                      Getting Started
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton 
                      href="/docs/api/authentication"
                      className="hover:bg-accent/50 transition-colors"
                    >
                      Authentication
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip="Guides"
                  className="hover:bg-accent/50 transition-colors"
                >
                  <a href="/docs/guides" className="flex items-center gap-3 px-6 font-[var(--font-anta)]">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-foreground">Guides</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuSub className="ml-4 border-l-2 border-accent/20">
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton 
                      href="/docs/guides/basics"
                      className="hover:bg-accent/50 transition-colors"
                    >
                      Basics
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton 
                      href="/docs/guides/advanced"
                      className="hover:bg-accent/50 transition-colors"
                    >
                      Advanced
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-2 backdrop-blur">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button 
              className="flex h-[60px] w-full items-center gap-3 px-4 hover:bg-accent/50 rounded-lg transition-colors group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2 focus:outline-none"
              onClick={!user ? handleLogin : undefined}
            >
              <Avatar className="h-8 w-8 flex-shrink-0 border-2 border-primary/10">
                <AvatarImage src={user?.avatarUrl} alt={user?.displayName} />
                <AvatarFallback className="bg-primary/10">
                  {user ? user.displayName[0] : 'L'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-left flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-medium truncate w-full font-[var(--font-anta)]">
                  {user ? user.displayName : 'Login'}
                </span>
                {user && (
                  <span className="text-xs text-muted-foreground truncate w-full">
                    My Account
                  </span>
                )}
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 group-data-[collapsible=icon]:hidden" />
            </button>
          </DropdownMenuTrigger>
          {user && (
            <DropdownMenuContent className="w-56" align="start" side="right">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? (
                  <Sun className="mr-2 h-4 w-4" />
                ) : (
                  <Moon className="mr-2 h-4 w-4" />
                )}
                <span>Toggle theme</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
