const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

export async function getAccessToken() {
  const basicAuth = Buffer.from(
    process.env.SPOTIFY_CLIENT_ID +
      ":" +
      process.env.SPOTIFY_CLIENT_SECRET
  ).toString("base64");

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to refresh Spotify access token", { cause: res });
  }

  return res.json();
}
