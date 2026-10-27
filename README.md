# QRSnap

QRSnap is a macOS Raycast extension for scanning QR codes and other supported barcodes from your screen or a PNG image URL. When a code is detected, its contents are copied to your clipboard.

## Features

- Capture and scan a selected area of your screen.
- Scan a PNG image from a URL.
- Recognize QR codes, Micro QR codes, and Data Matrix codes.
- Copy decoded text to the clipboard.

## Requirements

- macOS
- Raycast
- Node.js and pnpm (for development)

## Development

Install dependencies and run the extension in Raycast:

```sh
pnpm install
pnpm dev
```

Build and lint the extension:

```sh
pnpm build
pnpm lint
```

## Usage

1. Open the **ScanQR** command in Raycast.
2. Choose **Select Area** and drag over a barcode, or choose **Paste Image URL** and submit a URL that returns a PNG image.
3. If a barcode is found, its contents are copied to the clipboard.

The URL scanner currently supports PNG images only.

## Screen recording permission

macOS may require Raycast to have screen recording access for screen captures. Manage this in **System Settings → Privacy & Security → Screen & System Audio Recording**. Restart Raycast after changing the permission.
