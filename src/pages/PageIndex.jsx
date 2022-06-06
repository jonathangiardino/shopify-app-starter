import {
  Card,
  Heading,
  Image,
  Layout,
  Page,
  Stack,
  TextContainer,
} from "@shopify/polaris";
import { useNavigate } from "react-router";
import trophyImgUrl from "../assets/home-trophy.png";
// import analytics from "../lib/segment/index.js";

export default function PageIndex() {
  // Example tracking
  // analytics.page({
  //   userId: "testshopify.myshopify.com",
  //   name: "Index",
  //   type: "page",
  // });

  const navigate = useNavigate();

  return (
    <Page
      fullWidth
      breadcrumbs={[
        {
          content: "Back",
          onAction: () => navigate(-1),
        },
      ]}
    >
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
                  <Heading>Page Index Example</Heading>
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
