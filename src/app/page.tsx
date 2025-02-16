'use client';

import { useState } from 'react';
import { Hero } from '@/components/home/Hero';

export default function Home(): React.JSX.Element {
  const [username, setUsername] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  return (
    <main className="min-h-screen bg-[#17181B]">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Recherche d&apos;utilisateur Roblox</h1>
        
        <form onSubmit={searchUser} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez un nom d'utilisateur"
              className="flex-1 p-2 border rounded"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Recherche...' : 'Rechercher'}
            </button>
          </div>
        </form>

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded mb-4">
            {error}
          </div>
        )}

        {userInfo && (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-start gap-6">
              {userInfo.avatar && (
                <img
                  src={userInfo.avatar}
                  alt={`Avatar de ${userInfo.name}`}
                  className="w-32 h-32 rounded-full"
                />
              )}
              <div>
                <h2 className="text-2xl font-bold mb-2">{userInfo.name}</h2>
                <p className="text-gray-600 mb-2">ID: {userInfo.id}</p>
                <p className="text-gray-600 mb-2">
                  Créé le: {new Date(userInfo.created).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  Description: {userInfo.description || 'Aucune description'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
