import {
  BarcodeFormat,
  BinaryBitmap,
  DecodeHintType,
  HybridBinarizer,
  MultiFormatReader,
  RGBLuminanceSource,
} from "@zxing/library";
import { PNGWithMetadata } from "pngjs";

const hints = new Map();
const formats = [BarcodeFormat.QR_CODE, BarcodeFormat.MICRO_QR_CODE, BarcodeFormat.DATA_MATRIX];
hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
const reader = new MultiFormatReader();

export function scanQr(png: PNGWithMetadata) {
  const pixels = new Int32Array(png.width * png.height);
  for (let i = 0, p = 0; i < png.data.length; i += 4, p++) {
    pixels[p] = (png.data[i] << 16) | (png.data[i + 1] << 8) | png.data[i + 2];
  }
  if (!png.data) return null;
  const luminance = new RGBLuminanceSource(pixels, png.width, png.height);
  const bitmap = new BinaryBitmap(new HybridBinarizer(luminance));
  return reader.decode(bitmap, hints);
}
