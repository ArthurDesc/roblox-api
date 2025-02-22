'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { Search, Home as HomeIcon, Star, Gift, Clock, CheckCircle, LogIn } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Toaster, toast } from '@/components/ui/sonner';
import { ThreeDButton } from '@/components/ui/3d-button';

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
          // Afficher la notification si l'utilisateur vient de se connecter
          const urlParams = new URLSearchParams(window.location.search);
          if (urlParams.get('logged') === 'true') {
            toast.success('Connexion réussie !', {
              description: `Bienvenue ${data.displayName || data.name}`,
            });
            // Nettoyer l'URL
            window.history.replaceState({}, document.title, '/');
          }
        }
      })
      .catch(err => console.error('Erreur lors de la vérification de la connexion:', err));
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
    <>
      <Toaster position="top-center" />
      <main className="min-h-screen bg-background text-foreground">
        {/* Hero Section */}
        <div className="relative py-20 px-4 text-center">
          <div className="absolute inset-0">
            <div className="absolute w-96 h-96 bg-[#00A2FF] rounded-full blur-[150px] -top-20 -left-20 opacity-20 animate-pulse" />
            <div className="absolute w-96 h-96 bg-[#FF3F3F] rounded-full blur-[150px] -bottom-20 -right-20 opacity-20 animate-pulse" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Gagnez des <span className="text-[#00A2FF]">Robux</span> facilement !
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Participez à des mini-jeux, complétez des tâches et obtenez des Robux en récompense. 
              C'est simple, rapide et amusant !
            </p>
            <div className="flex justify-center w-full">
              <ThreeDButton
                onClick={handleLogin}
              >
                <div className="flex items-center">
                  <LogIn className="mr-2 h-6 w-6" />
                  <span>{isLoggedIn ? 'Accéder à mon compte' : 'Se connecter avec Roblox'}</span>
                </div>
              </ThreeDButton>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Comment ça marche ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <HomeIcon className="h-10 w-10 mb-4 text-[#00A2FF]" />
                  <CardTitle>Créez un compte</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    Inscrivez-vous en quelques secondes avec votre compte Roblox.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Star className="h-10 w-10 mb-4 text-[#00A2FF]" />
                  <CardTitle>Gagnez des points</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    Complétez des mini-jeux et des tâches pour accumuler des points.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Gift className="h-10 w-10 mb-4 text-[#00A2FF]" />
                  <CardTitle>Échangez vos points</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    Convertissez vos points en Robux et recevez-les instantanément.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="py-16 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Pourquoi choisir notre site ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Clock className="h-10 w-10 mb-4 mx-auto text-[#00A2FF]" />
                <h3 className="text-xl font-semibold mb-2">Rapide et facile</h3>
                <p className="text-muted-foreground">
                  Gagnez des Robux en quelques minutes grâce à des tâches simples.
                </p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-10 w-10 mb-4 mx-auto text-[#00A2FF]" />
                <h3 className="text-xl font-semibold mb-2">Sécurisé</h3>
                <p className="text-muted-foreground">
                  Votre compte Roblox est en sécurité avec notre système de connexion OAuth.
                </p>
              </div>
              <div className="text-center">
                <Gift className="h-10 w-10 mb-4 mx-auto text-[#00A2FF]" />
                <h3 className="text-xl font-semibold mb-2">Récompenses instantanées</h3>
                <p className="text-muted-foreground">
                  Recevez vos Robux directement sur votre compte Roblox.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
