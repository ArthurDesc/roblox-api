'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Settings,
  User,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  username?: string;
}

export function Sidebar({ username }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        {!isCollapsed && (
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            Roblox API
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <Link
          href="/"
          className={cn(
            'flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors w-full',
            pathname === '/'
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
          )}
        >
          <Home className="h-5 w-5 min-w-[20px]" />
          {!isCollapsed && <span>Accueil</span>}
        </Link>
      </nav>

      {/* User Profile */}
      {username && (
        <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            {!isCollapsed && (
              <span className="text-sm text-gray-800 dark:text-white">
                {username}
              </span>
            )}
          </div>
          <div className={cn('mt-2 space-y-1', isCollapsed && 'space-y-2')}>
            <Link
              href="/settings"
              className={cn(
                'flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors w-full text-sm',
                'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              )}
            >
              <Settings className="h-4 w-4 min-w-[16px]" />
              {!isCollapsed && <span>Paramètres</span>}
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className={cn(
                'w-full flex items-center space-x-2 px-3 justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20',
                isCollapsed && 'justify-center'
              )}
            >
              <LogOut className="h-4 w-4 min-w-[16px]" />
              {!isCollapsed && <span>Déconnexion</span>}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
