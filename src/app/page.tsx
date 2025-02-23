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
    // Check login status on load
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setIsLoggedIn(true);
          setLoggedInUser({
            name: data.name,
            displayName: data.displayName
          });
          // Show notification if user just logged in
          const urlParams = new URLSearchParams(window.location.search);
          if (urlParams.get('logged') === 'true') {
            toast.success('Login successful!', {
              description: `Welcome ${data.displayName || data.name}`,
            });
            // Clean up URL
            window.history.replaceState({}, document.title, '/');
          }
        }
      })
      .catch(err => console.error('Error checking login status:', err));
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
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      setError('Error searching for user');
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
      <main className="min-h-screen bg-background text-foreground relative">
        {/* Hero Section */}
        <div className="relative py-20 px-4 text-center">
          <div className="absolute inset-0 z-9">
            <div className="absolute w-96 h-96 bg-[#00A2FF] rounded-full blur-[150px] -top-20 -left-20 opacity-20 animate-pulse" />
            <div className="absolute w-96 h-96 bg-[#FF3F3F] rounded-full blur-[150px] -bottom-20 -right-20 opacity-20 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Turn your <span className="text-[#FF3F3F]">Dreams</span> into Robux !
          </h1>
          <img 
            src="/assets/images/RobuxIcon.webp" 
            alt="Robux Icon"
            className="w-16 mx-auto mb-8 animate-spin-slow"
          />
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Join our community of passionate players and discover a world of rewards. 
            Every challenge you complete brings you closer to your Roblox goals!
          </p>
          <div className="flex justify-center w-full">
            <ThreeDButton onClick={handleLogin}>
              <div className="flex items-center">
                <LogIn className="mr-2 h-6 w-6" />
                <span>{isLoggedIn ? 'Access my account' : 'Start the adventure!'}</span>
              </div>
            </ThreeDButton>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How it works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <HomeIcon className="h-10 w-10 mb-4 text-[#00A2FF]" />
                  <CardTitle>Create an account</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    Sign up in seconds with your Roblox account.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Star className="h-10 w-10 mb-4 text-[#00A2FF]" />
                  <CardTitle>Earn points</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    Complete mini-games and tasks to accumulate points.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Gift className="h-10 w-10 mb-4 text-[#00A2FF]" />
                  <CardTitle>Exchange your points</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    Convert your points into Robux and receive them instantly.
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
              Why choose our site?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Clock className="h-10 w-10 mb-4 mx-auto text-[#00A2FF]" />
                <h3 className="text-xl font-semibold mb-2">Fast and easy</h3>
                <p className="text-muted-foreground">
                  Earn Robux in minutes through simple tasks.
                </p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-10 w-10 mb-4 mx-auto text-[#00A2FF]" />
                <h3 className="text-xl font-semibold mb-2">Secure</h3>
                <p className="text-muted-foreground">
                  Your Roblox account is safe with our OAuth login system.
                </p>
              </div>
              <div className="text-center">
                <Gift className="h-10 w-10 mb-4 mx-auto text-[#00A2FF]" />
                <h3 className="text-xl font-semibold mb-2">Instant rewards</h3>
                <p className="text-muted-foreground">
                  Receive your Robux directly in your Roblox account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
