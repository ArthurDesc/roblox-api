import { NextResponse } from 'next/server';
import { getRobloxApiConfig } from '@/lib/roblox-api';

const { redirectUri, urls } = getRobloxApiConfig();

export async function GET() {
  try {
    const clientId = process.env.ROBLOX_OAUTHID;
    console.log('[DEBUG] Starting OAuth process with client ID:', clientId);
    console.log('[DEBUG] Using redirect URI:', redirectUri);

    const state = Math.random().toString(36).substring(7);
    console.log('[DEBUG] Generated state:', state);

    const params = new URLSearchParams({
      client_id: clientId!,
      redirect_uri: redirectUri,
      scope: 'openid profile',
      response_type: 'code',
      state: state,
    });

    const authUrl = `${urls.authorize}?${params.toString()}`;
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