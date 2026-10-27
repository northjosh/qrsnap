import { Action, ActionPanel, Form, showToast, Toast } from "@raycast/api";

export default function SubmitUrlForm() {
    return (
        <Form
            actions={
                <ActionPanel>
                    <Action.SubmitForm
                        title="Scan from Url"
                        onSubmit={async (values: { url: string }) => { await showToast({title: values.url})}}
                    />
                </ActionPanel>
            }
            >
            <Form.TextField id="url" placeholder="Enter Image Url" title="Url" defaultValue=""/>
            </Form>
    )
}