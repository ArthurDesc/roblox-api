import { NextResponse } from 'next/server';

const ROBLOX_OAUTH_URL = 'https://apis.roblox.com/oauth/v1/authorize';
const REDIRECT_URI = 'https://85ef-88-162-202-56.ngrok-free.app/api/auth/roblox/callback';

export async function GET() {
  try {
    const clientId = process.env.ROBLOX_OAUTHID;
    console.log('[DEBUG] Starting OAuth process with client ID:', clientId);
    console.log('[DEBUG] Using redirect URI:', REDIRECT_URI);

    const state = Math.random().toString(36).substring(7);
    console.log('[DEBUG] Generated state:', state);

    const params = new URLSearchParams({
      client_id: clientId!,
      redirect_uri: REDIRECT_URI,
      scope: 'openid profile',
      response_type: 'code',
      state: state,
    });

    const authUrl = `${ROBLOX_OAUTH_URL}?${params.toString()}`;
    console.log('[DEBUG] Generated auth URL:', authUrl);
    console.log('[DEBUG] Full params:', params.toString());

    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('[ERROR] OAuth initialization failed:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'initialisation de l\'authentification' },
      { status: 500 }
    );
  }
} 