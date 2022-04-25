import {
  Card,
  Heading,
  Image,
  Layout,
  Page,
  Stack,
  TextContainer,
} from "@shopify/polaris";
import trophyImgUrl from "../assets/home-trophy.png";
import analytics from "../lib/segment/index.js";

export default function PageGeneral() {
  analytics.page();
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Stack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <Stack.Item fill>
                <TextContainer spacing="loose">
                  <Heading>Page General Example</Heading>
                </TextContainer>
              </Stack.Item>
              <Stack.Item>
                <div style={{ padding: "0 20px" }}>
                  <Image
                    source={trophyImgUrl}
                    alt="Nice work on building a Shopify app"
                    width={120}
                  />
                </div>
              </Stack.Item>
            </Stack>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card sectioned>
            <Stack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <Stack.Item fill>
                <TextContainer spacing="loose">
                  <Heading>Secondary Section</Heading>
                </TextContainer>
              </Stack.Item>
            </Stack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
