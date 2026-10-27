import { execFile } from "node:child_process";
import { randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import { promisify } from "node:util";

const IMAGE_PATHS = "/tmp/scanqr/";
const run = promisify(execFile);

export type CaptureMethod = "area" | "fullscreen" | "window";
const methodArg: Record<CaptureMethod, string> = {
  area: "-i",
  fullscreen: "-x",
  window: "-iw",
};

export async function capture(method: CaptureMethod) {
  const filename = `${IMAGE_PATHS}${randomUUID()}.png`;
  try {
    await run("screencapture", [methodArg[method], filename]);
  } catch (e) {
    console.log(e);
  }
  if (!existsSync(filename)) {
    throw new Error("Image not captured");
  }
  return filename;
}
