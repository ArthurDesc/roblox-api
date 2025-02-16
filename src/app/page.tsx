'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Navbar } from '@/components/navbar/Navbar';

interface UserInfo {
  name: string;
  displayName: string;
  id: number;
  created: string;
  description: string;
  avatar: string;
  isBanned: boolean;
}

interface RobloxUser {
  name: string;
  displayName: string;
}

export default function Home() {
  const [username, setUsername] = useState('');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<RobloxUser | null>(null);

  useEffect(() => {
    // Vérifier l'état de connexion au chargement
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setIsLoggedIn(true);
          setLoggedInUser({
            name: data.name,
            displayName: data.displayName
          });
        }
      })
      .catch(err => console.error('Erreur lors de la vérification de la connexion:', err));

    // Vérifier si l'utilisateur vient de se connecter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('logged') === 'true') {
      // Nettoyer l'URL
      window.history.replaceState({}, document.title, '/');
    }
  }, []);

  const searchUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUserInfo(null);

    try {
      const response = await fetch(`/api/users?username=${encodeURIComponent(username)}`);
      const data = await response.json();

      if (response.ok) {
        setUserInfo(data);
      } else {
        setError(data.error || 'Une erreur est survenue');
      }
    } catch (err) {
      setError('Erreur lors de la recherche de l\'utilisateur');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    window.location.href = '/api/auth/roblox';
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar username={loggedInUser?.displayName} />
      
      <div className="p-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Recherche d&apos;utilisateur Roblox</CardTitle>
              <CardDescription>
                Entrez un nom d&apos;utilisateur Roblox pour voir ses informations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isLoggedIn ? (
                <Button 
                  onClick={handleLogin}
                  className="w-full bg-[#00A2FF] hover:bg-[#008AE0]"
                >
                  Se connecter avec Roblox
                </Button>
              ) : (
                <Alert className="bg-green-100 text-green-800 mb-4">
                  <AlertDescription>
                    Vous êtes connecté avec succès !
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={searchUser} className="flex gap-4">
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Entrez un nom d'utilisateur"
                  className="flex-1"
                  required
                />
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Recherche...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      Rechercher
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {loading && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-6">
                  <Skeleton className="h-32 w-32 rounded-full" />
                  <div className="flex-1 space-y-4">
                    <Skeleton className="h-8 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[300px]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {userInfo && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {userInfo.avatar && (
                    <div className="relative">
                      <img
                        src={userInfo.avatar}
                        alt={`Avatar de ${userInfo.name}`}
                        className="w-32 h-32 rounded-full object-cover border-4 border-primary/10"
                      />
                      {userInfo.isBanned && (
                        <Badge variant="destructive" className="absolute -top-2 -right-2">
                          Banni
                        </Badge>
                      )}
                    </div>
                  )}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold">{userInfo.displayName}</h2>
                      <p className="text-muted-foreground">@{userInfo.name}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        ID: {userInfo.id}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Créé le: {new Date(userInfo.created).toLocaleDateString()}
                      </p>
                    </div>
                    {userInfo.description && (
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm whitespace-pre-wrap">
                          {userInfo.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}
