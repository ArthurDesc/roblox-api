import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const userCookie = cookieStore.get('roblox_user');

    if (!userCookie) {
      return NextResponse.json(
        { error: 'Non connecté' },
        { status: 401 }
      );
    }

    const userData = JSON.parse(userCookie.value);
    
    return NextResponse.json({
      name: userData.name,
      displayName: userData.displayName,
    });
  } catch (error) {
    console.error('[ERROR] Failed to get user info:', error);
    return NextResponse.json(
      { error: 'Failed to get user info' },
      { status: 500 }
    );
  }
} 