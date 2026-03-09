import { mkdir, writeFile, appendFile } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

const HISTORY_DIR = process.env.HISTORY_DIR || "/opt/gptestate/data/history";

interface HistoryEntry {
  id: string;
  timestamp: string;
  mode: string;
  params: Record<string, string | null>;
  inputSize: number;
  outputSize?: number;
  error?: string;
  ip?: string;
  userAgent?: string;
}

/**
 * Log a generation request: save images + metadata.
 * Non-blocking — errors are silently logged, never thrown.
 */
export async function logHistory(opts: {
  mode: string;
  params: Record<string, string | null>;
  inputBuffer: Buffer;
  outputDataUri?: string;
  error?: string;
  ip?: string;
  userAgent?: string;
}): Promise<void> {
  try {
    const now = new Date();
    const date = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const id = randomUUID().slice(0, 8);
    const dir = join(HISTORY_DIR, date, `${now.toISOString().slice(11, 19).replace(/:/g, "-")}_${opts.mode}_${id}`);

    await mkdir(dir, { recursive: true });

    // Save input image
    await writeFile(join(dir, "input.jpg"), opts.inputBuffer);

    // Save output image if present
    let outputSize: number | undefined;
    if (opts.outputDataUri) {
      const base64 = opts.outputDataUri.replace(/^data:image\/\w+;base64,/, "");
      const outputBuf = Buffer.from(base64, "base64");
      outputSize = outputBuf.length;
      await writeFile(join(dir, "output.jpg"), outputBuf);
    }

    // Save metadata
    const entry: HistoryEntry = {
      id,
      timestamp: now.toISOString(),
      mode: opts.mode,
      params: opts.params,
      inputSize: opts.inputBuffer.length,
      outputSize,
      error: opts.error,
      ip: opts.ip,
      userAgent: opts.userAgent,
    };
    await writeFile(join(dir, "meta.json"), JSON.stringify(entry, null, 2));

    // Append to daily log for quick overview
    const logLine = `${now.toISOString()} | ${opts.mode} | ${opts.params.refinePrompt || opts.params.description || opts.params.style || ""} | ${opts.error || "ok"}\n`;
    await appendFile(join(HISTORY_DIR, date, "log.txt"), logLine);

    console.log("[history] Saved:", dir);
  } catch (err) {
    console.error("[history] Failed to save:", err);
  }
}
