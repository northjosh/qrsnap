import {
  BarcodeFormat,
  BinaryBitmap,
  DecodeHintType,
  HybridBinarizer,
  MultiFormatReader,
  RGBLuminanceSource,
} from "@zxing/library";
import { readFileSync } from "fs";
import { PNG } from "pngjs";
import { imageDimensionsFromData } from "image-dimensions";

const hints = new Map();
const formats = [BarcodeFormat.QR_CODE, BarcodeFormat.MICRO_QR_CODE, BarcodeFormat.DATA_MATRIX];
hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
const reader = new MultiFormatReader();

export function scanQr(path: string) {
  const { width, height, data } = PNG.sync.read(readFileSync(path));
  const pixels = new Int32Array(width * height);

  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    pixels[p] = (data[i] << 16) | (data[i + 1] << 8) | data[i + 2];
  }

  if (!data) return null;

  const luminance = new RGBLuminanceSource(pixels, width, height);
  const bitmap = new BinaryBitmap(new HybridBinarizer(luminance));
  return reader.decode(bitmap, hints);
}
