import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";

const TMP_DIR = join(tmpdir(), "gptestate-tmp");

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  // Sanitize — only allow alphanumeric + dash + dot
  if (!/^[\w\-.]+$/.test(id)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filePath = join(TMP_DIR, id);
  try {
    const data = await readFile(filePath);
    return new NextResponse(data, {
      headers: { "Content-Type": "image/jpeg", "Cache-Control": "no-store" },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
