import { NextResponse } from "next/server";
import { getAccessToken } from "../../lib/spotify";

export const revalidate = 60; // cache for 60 seconds

export async function GET() {
  try {
    const { access_token } = await getAccessToken();

    const response = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Spotify API error" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const track = data.items?.[0]?.track;

    if (!track) return NextResponse.json(null);

    return NextResponse.json({
      title: track.name || "Unknown Track",
      artist: track.artists?.map((a: any) => a.name).join(", ") || "Unknown Artist",
      albumArt: track.album?.images?.[0]?.url || "",
      url: track.external_urls?.spotify || "",
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", message: (err as Error).message },
      { status: 500 }
    );
  }
}
