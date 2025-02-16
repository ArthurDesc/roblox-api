import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = cookies();
    
    // Supprimer le cookie en le remplaçant par un cookie expiré
    cookieStore.set('roblox_user', '', {
      expires: new Date(0),
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[ERROR] Logout failed:', error);
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    );
  }
} 