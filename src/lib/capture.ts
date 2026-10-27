import { execFile } from "node:child_process";
import { randomUUID } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
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
  return readFileSync(filename);
}

export async function fetchImage(path: string) {
  const res = await fetch(path);
  if (!res.ok || res === null) throw new Error("An error occured");
  const content = res.headers.get("content-type");
  if (!content?.includes("image")) {
    throw new Error("URL must return an image");
  }

  if (content === "image/webp") {
    throw new Error("Webp not supported");
  }

  const buf = await res.arrayBuffer();
  console.log(buf);
  return Buffer.from(buf);
}
