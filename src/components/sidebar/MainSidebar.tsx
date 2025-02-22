'use client';

import * as React from 'react';
import { Home, History, Star, Settings, Search, Book, FileText } from "lucide-react"
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

export function MainSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b px-2 py-4">
        <h2 className="text-lg font-semibold tracking-tight">Roblox API</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Accueil">
                  <a href="/">
                    <Home className="h-4 w-4" />
                    <span>Accueil</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Historique">
                  <a href="/history">
                    <History className="h-4 w-4" />
                    <span>Historique</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Favoris">
                  <a href="/starred">
                    <Star className="h-4 w-4" />
                    <span>Favoris</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Recherche">
                  <a href="/search">
                    <Search className="h-4 w-4" />
                    <span>Recherche</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Paramètres">
                  <a href="/settings">
                    <Settings className="h-4 w-4" />
                    <span>Paramètres</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Documentation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="API Reference">
                  <a href="/docs/api">
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
                  <a href="/docs/guides">
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
      <SidebarFooter className="border-t px-2 py-4">
        <p className="text-xs text-muted-foreground">
          Version 1.0.0
        </p>
      </SidebarFooter>
    </Sidebar>
  )
}
