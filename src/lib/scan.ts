import {
  BarcodeFormat,
  BinaryBitmap,
  DecodeHintType,
  HybridBinarizer,
  MultiFormatReader,
  RGBLuminanceSource,
} from "@zxing/library";
import { Jimp } from "jimp";
const hints = new Map();
const formats = [BarcodeFormat.QR_CODE, BarcodeFormat.MICRO_QR_CODE, BarcodeFormat.DATA_MATRIX];
hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
const reader = new MultiFormatReader();

export async function scanQr(buffer: Buffer) {
  const image = await Jimp.read(buffer);
  const data = image.bitmap.data
  const pixels = new Int32Array(image.width * image.height);
  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    pixels[p] = (data[i] << 16) | (data[i + 1] << 8) | data[i + 2];
  }

  if (!image) return null;

  const luminance = new RGBLuminanceSource(pixels, image.width, image.height);
  const bitmap = new BinaryBitmap(new HybridBinarizer(luminance));
  return reader.decode(bitmap, hints);
}
