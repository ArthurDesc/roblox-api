// Utilitaire pour gérer les appels à l'API Roblox
const getApiUrl = () => {
  // En développement, on utilise Ngrok pour l'OAuth
  if (process.env.NODE_ENV === 'development' && process.env.NGROK_URL) {
    return process.env.NGROK_URL.replace(/\/api$/, '');
  }
  return process.env.NEXT_PUBLIC_APP_URL;
};

const getApiEndpoint = () => {
  // Pour les appels API, on utilise Ngrok en développement si disponible
  if (process.env.NODE_ENV === 'development' && process.env.NGROK_URL) {
    return process.env.NGROK_URL.replace(/\/api$/, '');
  }
  return process.env.NEXT_PUBLIC_APP_URL;
};

export const getRobloxApiConfig = () => {
  const baseUrl = getApiUrl();
  const apiBase = getApiEndpoint();
  
  return {
    oauthId: process.env.ROBLOX_OAUTHID,
    oauthSecret: process.env.ROBLOX_OAUTHSECRET,
    redirectUri: `${baseUrl}/api/auth/roblox/callback`, // Mise à jour du chemin pour correspondre à la configuration Roblox
    apiKey: process.env.ROBLOX_API_KEY,
    apiEndpoint: 'https://apis.roblox.com',
    // URLs spécifiques
    urls: {
      authorize: 'https://apis.roblox.com/oauth/v1/authorize',
      token: 'https://apis.roblox.com/oauth/v1/token',
      userInfo: 'https://apis.roblox.com/oauth/v1/userinfo'
    }
  };
};

export const getRobloxHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const apiKey = process.env.ROBLOX_API_KEY;
  if (apiKey) {
    headers['Roblox-Api-Key'] = apiKey;
  }
  
  return headers;
};

export const handleRobloxApiError = (error: any) => {
  console.error('Roblox API Error:', error);
  
  if (error.response) {
    const { status, data } = error.response;
    return {
      status,
      error: data.message || 'Une erreur est survenue avec l\'API Roblox',
    };
  }
  
  return {
    status: 500,
    error: 'Erreur de connexion avec l\'API Roblox',
  };
};
