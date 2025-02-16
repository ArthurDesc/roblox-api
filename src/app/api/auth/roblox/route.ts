import { NextResponse } from 'next/server';

const ROBLOX_OAUTH_URL = 'https://apis.roblox.com/oauth/v1/authorize';
const REDIRECT_URI = 'http://localhost:3000/api/auth/roblox/callback';

export async function GET() {
  const clientId = process.env.ROBLOX_OAUTHID;

  const params = new URLSearchParams({
    client_id: clientId!,
    redirect_uri: REDIRECT_URI,
    scope: 'openid profile',
    response_type: 'code',
    state: Math.random().toString(36).substring(7),
  });

  const authUrl = `${ROBLOX_OAUTH_URL}?${params.toString()}`;

  return NextResponse.redirect(authUrl);
} 