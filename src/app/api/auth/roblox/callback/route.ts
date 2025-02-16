import { NextResponse } from 'next/server';

const ROBLOX_TOKEN_URL = 'https://apis.roblox.com/oauth/v1/token';
const REDIRECT_URI = 'https://85ef-88-162-202-56.ngrok-free.app/api/auth/roblox/callback';

async function getAccessToken(code: string) {
  const clientId = process.env.ROBLOX_OAUTHID;
  const clientSecret = process.env.ROBLOX_OAUTHSECRET;

  const response = await fetch(ROBLOX_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get access token');
  }

  return response.json();
}

async function getRobloxUserInfo(accessToken: string) {
  const response = await fetch('https://apis.roblox.com/oauth/v1/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get user info');
  }

  return response.json();
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code) {
      return NextResponse.json(
        { error: 'Code manquant dans la requête' },
        { status: 400 }
      );
    }

    // Obtenir le token d'accès
    const tokenData = await getAccessToken(code);
    console.log('[DEBUG] Token data:', tokenData);

    // Obtenir les informations de l'utilisateur
    const userInfo = await getRobloxUserInfo(tokenData.access_token);
    console.log('[DEBUG] User info:', userInfo);

    // Ici, vous pouvez stocker les informations de l'utilisateur dans une session
    // ou dans un cookie pour maintenir la connexion

    // Rediriger vers la page d'accueil avec les informations de l'utilisateur
    const redirectUrl = new URL('/', request.url);
    redirectUrl.searchParams.set('logged', 'true');
    
    return NextResponse.redirect(redirectUrl.toString());
  } catch (error) {
    console.error('[ERROR] Auth callback error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'authentification' },
      { status: 500 }
    );
  }
} 