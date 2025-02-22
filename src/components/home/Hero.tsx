import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';

export function Hero() {
  return (
    <div className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-b from-[#1E2024] to-[#17181B] overflow-hidden w-full max-w-[100vw]">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-[#00A2FF] rounded-full blur-[150px] -top-20 -left-20 opacity-20 animate-pulse" />
        <div className="absolute w-96 h-96 bg-[#FF3F3F] rounded-full blur-[150px] -bottom-20 -right-20 opacity-20 animate-pulse" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          iZi Robux
          <span className="text-[#00A2FF]"> Explorer</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Découvrez la puissance de l'API Roblox. Créez, explorez et intégrez les fonctionnalités de Roblox dans vos applications.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/api/explorer">
            <Button size="lg">
              Commencer
            </Button>
          </Link>
          <Link href="/docs">
            <Button variant="secondary" size="lg">
              Documentation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 