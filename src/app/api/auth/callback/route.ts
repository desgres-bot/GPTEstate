import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // TODO: Handle Supabase auth callback
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (code) {
    // Exchange code for session via Supabase
  }

  return NextResponse.redirect(new URL("/generate", req.url));
}
