import { UserCircle } from 'lucide-react';

interface NavbarProps {
  username?: string;
}

export function Navbar({ username }: NavbarProps) {
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
              <div className="flex items-center space-x-2">
                <UserCircle className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                <span className="text-gray-800 dark:text-white font-medium">
                  {username}
                </span>
              </div>
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