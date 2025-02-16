#!/bin/sh

# Attendre que MongoDB soit prêt
echo "Waiting for MongoDB to be ready..."
sleep 5

# Nettoyer le cache npm si nécessaire
if [ -f "package-lock.json" ]; then
  echo "Cleaning npm cache..."
  npm cache clean --force
fi

# Installer ou mettre à jour les dépendances
echo "Installing/updating dependencies..."
npm install

# S'assurer que les dépendances SWC sont installées pour Alpine
echo "Ensuring SWC dependencies..."
npm install @next/swc-linux-x64-musl@14.1.0 --no-save

# Démarrer le serveur de développement
echo "Starting development server..."
npm run dev 