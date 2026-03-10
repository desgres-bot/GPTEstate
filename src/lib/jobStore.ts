/**
 * In-memory job store for background processing.
 * Jobs survive page reloads (server keeps running via PM2).
 * Jobs are auto-cleaned after 30 minutes.
 */

export type JobStatus = "pending" | "processing" | "done" | "error";

export interface Job {
  id: string;
  status: JobStatus;
  progress?: string;
  result?: unknown;
  error?: string;
  createdAt: number;
}

const jobs = new Map<string, Job>();

const JOB_TTL = 30 * 60 * 1000; // 30 min

function cleanup() {
  const now = Date.now();
  jobs.forEach((job, id) => {
    if (now - job.createdAt > JOB_TTL) {
      jobs.delete(id);
    }
  });
}

export function createJob(): Job {
  cleanup();
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const job: Job = { id, status: "pending", createdAt: Date.now() };
  jobs.set(id, job);
  return job;
}

export function getJob(id: string): Job | undefined {
  return jobs.get(id);
}

export function updateJob(id: string, updates: Partial<Omit<Job, "id" | "createdAt">>) {
  const job = jobs.get(id);
  if (job) {
    Object.assign(job, updates);
  }
}
