'use client';

import { UserCircle, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  username?: string;
}

export function Navbar({ username }: NavbarProps) {
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      if (response.ok) {
        // Recharger la page pour réinitialiser l'état
        window.location.reload();
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <nav className="bg-white shadow dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              Roblox API
            </span>
          </div>
          <div className="flex items-center">
            {username ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md transition-colors">
                  <UserCircle className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                  <span className="text-gray-800 dark:text-white font-medium">
                    {username}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <span className="text-gray-600 dark:text-gray-400">
                Non connecté
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 