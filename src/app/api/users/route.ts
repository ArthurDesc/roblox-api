import { NextResponse } from 'next/server';

interface RobloxUser {
  id: number;
  name: string;
  displayName: string;
}

// Gestion du rate limiting
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5;

function isRateLimited(username: string): boolean {
  const now = Date.now();
  const userRateLimit = rateLimitMap.get(username);

  if (!userRateLimit) {
    rateLimitMap.set(username, { count: 1, timestamp: now });
    return false;
  }

  if (now - userRateLimit.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(username, { count: 1, timestamp: now });
    return false;
  }

  if (userRateLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  userRateLimit.count++;
  return false;
}

async function getUserInfo(username: string) {
  try {
    console.log(`[DEBUG] Searching for user: ${username}`);

    // Vérification de la longueur minimale
    if (username.length < 3) {
      console.log(`[DEBUG] Username too short: ${username}`);
      return { error: 'Le nom d\'utilisateur doit contenir au moins 3 caractères' };
    }

    // Vérification du rate limiting
    if (isRateLimited(username)) {
      console.log(`[DEBUG] Rate limited for username: ${username}`);
      return { error: 'Veuillez patienter quelques secondes avant de réessayer' };
    }
    
    // D'abord, on récupère l'ID de l'utilisateur à partir du nom d'utilisateur
    const searchUrl = `https://users.roblox.com/v1/users/search?keyword=${username}&limit=10`;
    console.log(`[DEBUG] Making request to: ${searchUrl}`);
    
    const userResponse = await fetch(searchUrl);
    const userData = await userResponse.json();
    
    console.log(`[DEBUG] Search response:`, userData);
    
    if (userData.errors) {
      if (userData.errors[0].code === 0 && userData.errors[0].message === 'Too many requests') {
        console.log(`[DEBUG] Roblox API rate limit hit for username: ${username}`);
        return { error: 'Le service est temporairement indisponible, veuillez réessayer dans quelques instants' };
      }
      return { error: userData.errors[0].userFacingMessage || 'Une erreur est survenue' };
    }

    if (!userData.data || userData.data.length === 0) {
      console.log(`[DEBUG] No user found for username: ${username}`);
      return { error: 'Utilisateur non trouvé' };
    }

    // On prend le premier utilisateur qui correspond exactement au nom recherché
    const exactMatch = userData.data.find((user: RobloxUser) => user.name.toLowerCase() === username.toLowerCase());
    const userId = exactMatch ? exactMatch.id : userData.data[0].id;
    console.log(`[DEBUG] Found user ID: ${userId}`);

    // Ajout d'un délai pour éviter le rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Ensuite, on récupère les informations détaillées de l'utilisateur
    const detailsUrl = `https://users.roblox.com/v1/users/${userId}`;
    console.log(`[DEBUG] Fetching user details from: ${detailsUrl}`);
    
    const detailsResponse = await fetch(detailsUrl);
    const userDetails = await detailsResponse.json();
    console.log(`[DEBUG] User details response:`, userDetails);

    // Ajout d'un délai pour éviter le rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));

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
    return { error: 'Une erreur est survenue lors de la récupération des informations' };
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  console.log(`[DEBUG] Received request for username: ${username}`);

  if (!username) {
    console.log('[DEBUG] No username provided in request');
    return NextResponse.json(
      { error: 'Le nom d\'utilisateur est requis' },
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