import { Action, Clipboard, closeMainWindow, Icon, showHUD, showToast } from "@raycast/api";
import { capture, CaptureMethod } from "../lib/capture";
import { scanQr } from "../lib/scan";

export function ScanAction(props: { title: string, method: CaptureMethod }) {
    return (
        <Action
            icon={Icon.Camera}
            title={props.title}
            onAction={async () => {
                await closeMainWindow({ clearRootSearch: true });
                const file = await capture(props.method)
                const url = scanQr(file)
                if (!url) await showToast({ title: "no data found" })
                await Clipboard.paste(url?.getText())
                await showHUD("QR code copied to clipboard");
            }}
        />
    )
}