import { Action, ActionPanel, Form, showToast, Toast, useNavigation } from "@raycast/api";
import { fetchImage } from "../lib/capture";
import { scanQr } from "../lib/scan";
import { useState } from "react";
import ScanResult from "./ScanResult";

export default function SubmitUrlForm() {
    const [loading, setLoading] = useState<boolean>(false)
    const { push } = useNavigation()
    return (
        <Form isLoading={loading}
            actions={
                <ActionPanel>
                    <Action.SubmitForm
                        title="Scan from Url"
                        onSubmit={async (values: { url: string }) => {
                            setLoading(true)
                            if (!values.url.includes("https://")) {
                                await showToast({ title: "Invalid Url" })
                                return
                            }
                            try {
                                console.log(values.url)
                                const img = await fetchImage(values.url)
                                const data = await scanQr(img);
                                if (!data) {
                                    await showToast({ title: "No data Found" })
                                    return
                                }
                                setLoading(false)
                                push(<ScanResult image={values.url} url={data.getText()} />)
                                await showToast({ style: Toast.Style.Success, title: "Scanned" });
                            } catch (e) {
                                console.log(e)
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