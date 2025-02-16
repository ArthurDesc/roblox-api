import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ROBLOX_TOKEN_URL = 'https://apis.roblox.com/oauth/v1/token';
const REDIRECT_URI = 'https://56b0-88-162-202-56.ngrok-free.app/api/auth/roblox/callback';
const BASE_URL = 'https://56b0-88-162-202-56.ngrok-free.app';

async function getAccessToken(code: string) {
  const clientId = process.env.ROBLOX_OAUTHID;
  const clientSecret = process.env.ROBLOX_OAUTHSECRET;

  console.log('[DEBUG] Getting access token with code:', code);

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
    const errorData = await response.text();
    console.error('[ERROR] Token response:', errorData);
    throw new Error('Failed to get access token');
  }

  return response.json();
}

async function getRobloxUserInfo(accessToken: string) {
  console.log('[DEBUG] Getting user info with token');
  
  const response = await fetch('https://apis.roblox.com/oauth/v1/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('[ERROR] User info response:', errorData);
    throw new Error('Failed to get user info');
  }

  return response.json();
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    console.log('[DEBUG] Received callback with code:', code);
    console.log('[DEBUG] State:', state);

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

    // Créer un cookie sécurisé avec les informations de l'utilisateur
    const cookieStore = cookies();
    cookieStore.set('roblox_user', JSON.stringify({
      name: userInfo.name,
      displayName: userInfo.display_name || userInfo.name,
      accessToken: tokenData.access_token
    }), {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: '/'
    });

    // Rediriger vers la page d'accueil
    const finalRedirectUrl = `${BASE_URL}/?logged=true`;
    console.log('[DEBUG] Redirecting to:', finalRedirectUrl);
    
    return NextResponse.redirect(finalRedirectUrl);
  } catch (error) {
    console.error('[ERROR] Auth callback error:', error);
    return NextResponse.redirect(`${BASE_URL}/?error=auth_failed`);
  }
} 