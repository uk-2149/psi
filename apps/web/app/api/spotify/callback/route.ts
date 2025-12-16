import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "No code provided" },
      { status: 400 }
    );
  }

  const basicAuth = Buffer.from(
    process.env.SPOTIFY_CLIENT_ID +
      ":" +
      process.env.SPOTIFY_CLIENT_SECRET
  ).toString("base64");

  const tokenRes = await fetch(
    "https://accounts.spotify.com/api/token",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: "http://127.0.0.1:3000/api/spotify/callback",
      }),
    }
  );

  const tokenData = await tokenRes.json();

  // IMPORTANT: only do this once
  return NextResponse.json(tokenData);
}
