import { execFile } from "node:child_process";
import { randomUUID } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { promisify } from "node:util";
import { PNG } from "pngjs";

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
  return PNG.sync.read(readFileSync(filename));;
}

export async function fetchImage(path: string) {
  const res = await fetch(path);
  if (!res.ok) throw new Error("An error occured");
  if(res.headers.get("content-type") !== "image/png"){
    throw new Error("URL must return a PNG image")
  }
  const image = Buffer.from(await res.arrayBuffer());
  return PNG.sync.read(image);
}
