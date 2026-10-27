import { Action, ActionPanel, Detail } from "@raycast/api";

export default function ScanResult(props: { image: string, url: string }) {

    const markdown = ` # QR Code
![](${props.image})

Image pulled from URL
    `
    return (
        <Detail markdown={markdown} actions={
            <ActionPanel>
                <Action.CopyToClipboard content={props.url} />
                <Action.OpenInBrowser url={props.url} />
            </ActionPanel>
        } metadata={
            <Detail.Metadata>
                <Detail.Metadata.Link title="Extracted Data" target={props.url} text={props.url} />
            </Detail.Metadata>
        } />)
}