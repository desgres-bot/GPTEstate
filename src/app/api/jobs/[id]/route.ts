import { NextRequest, NextResponse } from "next/server";
import { getJob } from "@/lib/jobStore";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const job = getJob(params.id);
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }
  return NextResponse.json({
    id: job.id,
    status: job.status,
    progress: job.progress,
    result: job.status === "done" ? job.result : undefined,
    error: job.status === "error" ? job.error : undefined,
  });
}
