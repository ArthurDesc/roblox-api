import { NextResponse } from 'next/server';

interface RobloxUser {
  id: number;
  name: string;
  displayName: string;
}

async function getUserInfo(username: string) {
  try {
    console.log(`[DEBUG] Searching for user: ${username}`);
    
    // D'abord, on récupère l'ID de l'utilisateur à partir du nom d'utilisateur
    const searchUrl = `https://users.roblox.com/v1/users/search?keyword=${username}&limit=10`;
    console.log(`[DEBUG] Making request to: ${searchUrl}`);
    
    const userResponse = await fetch(searchUrl);
    const userData = await userResponse.json();
    
    console.log(`[DEBUG] Search response:`, userData);
    
    if (!userData.data || userData.data.length === 0) {
      console.log(`[DEBUG] No user found for username: ${username}`);
      return { error: 'User not found' };
    }

    // On prend le premier utilisateur qui correspond exactement au nom recherché
    const exactMatch = userData.data.find((user: RobloxUser) => user.name.toLowerCase() === username.toLowerCase());
    const userId = exactMatch ? exactMatch.id : userData.data[0].id;
    console.log(`[DEBUG] Found user ID: ${userId}`);

    // Ensuite, on récupère les informations détaillées de l'utilisateur
    const detailsUrl = `https://users.roblox.com/v1/users/${userId}`;
    console.log(`[DEBUG] Fetching user details from: ${detailsUrl}`);
    
    const detailsResponse = await fetch(detailsUrl);
    const userDetails = await detailsResponse.json();
    console.log(`[DEBUG] User details response:`, userDetails);

    // On récupère aussi les statistiques du joueur
    const thumbnailUrl = `https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=420x420&format=Png`;
    console.log(`[DEBUG] Fetching avatar from: ${thumbnailUrl}`);
    
    const thumbnailResponse = await fetch(thumbnailUrl);
    const thumbnailData = await thumbnailResponse.json();
    console.log(`[DEBUG] Avatar response:`, thumbnailData);

    const result = {
      ...userDetails,
      avatar: thumbnailData.data?.[0]?.imageUrl
    };
    
    console.log(`[DEBUG] Final response:`, result);
    return result;
    
  } catch (error) {
    console.error('[ERROR] Error fetching user info:', error);
    return { error: 'Failed to fetch user information' };
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  console.log(`[DEBUG] Received request for username: ${username}`);

  if (!username) {
    console.log('[DEBUG] No username provided in request');
    return NextResponse.json(
      { error: 'Username parameter is required' },
      { status: 400 }
    );
  }

  const userInfo = await getUserInfo(username);

  if (userInfo.error) {
    console.log(`[DEBUG] Error returned from getUserInfo: ${userInfo.error}`);
    return NextResponse.json(
      { error: userInfo.error },
      { status: 404 }
    );
  }

  console.log('[DEBUG] Successfully found user info');
  return NextResponse.json(userInfo);
} 