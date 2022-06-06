import { DisplayText, Page, Stack } from "@shopify/polaris";
import React from "react";
import { useNavigate } from "react-router";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <Stack wrap={false} distribution="fill" alignment="center" vertical>
        <Stack.Item>
          <Stack vertical spacing="extraTight" alignment="center">
            <DisplayText size="small">Settings page</DisplayText>
          </Stack>
        </Stack.Item>
      </Stack>
    </Page>
  );
};

export default Settings;
