import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get('user');
  
  if (userCookie) {
    try {
      const userData = JSON.parse(userCookie.value);
      return NextResponse.json({ user: userData });
    } catch {
      return NextResponse.json({ user: null });
    }
  }
  
  return NextResponse.json({ user: null });
}
