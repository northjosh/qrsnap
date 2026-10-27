import { Action, ActionPanel, Icon, List } from "@raycast/api";
import SubmitUrlForm from "./components/SubmitUrlForm";
import { ScanAction } from "./components/ScanAction";

export default function Command() {
  return (
    <List navigationTitle="Scan Type" searchBarPlaceholder="Choose how. you want to scan qr">
      <List.Item title="Select Area" icon={Icon.Crop} actions={
        <ActionPanel>
          <ScanAction title="Select Area" method="area" />
        </ActionPanel>
      } />
      <List.Item title="Paste Image Url" icon={Icon.Link} actions={
        <ActionPanel>
          <Action.Push title="Paste Image URL" target={<SubmitUrlForm />} />
        </ActionPanel>
      } />
    </List>
  );
}