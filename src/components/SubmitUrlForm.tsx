import { Action, ActionPanel, Clipboard, Form, showHUD, showToast } from "@raycast/api";
import { fetchImage } from "../lib/capture";
import { scanQr } from "../lib/scan";

export default function SubmitUrlForm() {
    return (
        <Form
            actions={
                <ActionPanel>
                    <Action.SubmitForm
                        title="Scan from Url"
                        onSubmit={async (values: { url: string }) => {
                            try {
                                const img = await fetchImage(values.url)
                                const data = scanQr(img)
                                if (!data) {
                                    await showToast({ title: "No deata Found" })
                                    return
                                }
                                await Clipboard.paste(data?.getText())
                                await showToast({ title: values.url })
                                await showHUD("QR code copied to clipboard");
                            } catch (e) {
                                if (e instanceof Error) {
                                    await showToast({ title: e.message })
                                }
                            }
                        }}
                    />
                </ActionPanel>
            }
        >
            <Form.TextField id="url" placeholder="Enter Image Url" title="Url" defaultValue="" />
        </Form>
    )
}