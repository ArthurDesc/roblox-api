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
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Accueil">
                  <a href="/" className="flex items-center gap-3 px-6">
                    <Home className="h-4 w-4" />
                    <span>Accueil</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Historique">
                  <a href="/history" className="flex items-center gap-3 px-6">
                    <History className="h-4 w-4" />
                    <span>Historique</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Favoris">
                  <a href="/starred" className="flex items-center gap-3 px-6">
                    <Star className="h-4 w-4" />
                    <span>Favoris</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Recherche">
                  <a href="/search" className="flex items-center gap-3 px-6">
                    <Search className="h-4 w-4" />
                    <span>Recherche</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Paramètres">
                  <a href="/settings" className="flex items-center gap-3 px-6">
                    <Settings className="h-4 w-4" />
                    <span>Paramètres</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-6">Documentation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="API Reference">
                  <a href="/docs/api" className="flex items-center gap-3 px-6">
                    <Book className="h-4 w-4" />
                    <span>API Reference</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton href="/docs/api/getting-started">
                      Getting Started
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton href="/docs/api/authentication">
                      Authentication
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Guides">
                  <a href="/docs/guides" className="flex items-center gap-3 px-6">
                    <FileText className="h-4 w-4" />
                    <span>Guides</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton href="/docs/guides/basics">
                      Les bases
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton href="/docs/guides/advanced">
                      Avancé
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button 
              className="flex h-[60px] w-full items-center gap-3 px-4 hover:bg-accent/50 rounded-md transition-colors group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2 focus:outline-none"
              onClick={!user ? handleLogin : undefined}
            >
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={user?.avatarUrl} alt={user?.displayName} />
                <AvatarFallback>
                  {user ? user.displayName[0] : 'C'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-left flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-medium truncate w-full">
                  {user ? user.displayName : 'Connexion'}
                </span>
                {user && (
                  <span className="text-xs text-muted-foreground truncate w-full">
                    Mon compte
                  </span>
                )}
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 group-data-[collapsible=icon]:hidden" />
            </button>
          </DropdownMenuTrigger>
          {user && (
            <DropdownMenuContent className="w-56" align="start" side="right">
              <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? (
                  <Sun className="mr-2 h-4 w-4" />
                ) : (
                  <Moon className="mr-2 h-4 w-4" />
                )}
                <span>Basculer le thème</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Facturation</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Paramètres</span>
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
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
