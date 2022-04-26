import {
  ActionList,
  Card,
  Heading,
  Image,
  Layout,
  Page,
  Stack,
  TextContainer,
} from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import trophyImgUrl from "../assets/home-trophy.png";
import { ProductsCard } from "../components/ProductsCard";
// import analytics from "../lib/segment/index.js";
import Link from "../router/Link.jsx";

export default function HomePage() {
  // Example tracking
  // analytics.page({
  //   userId: "testshopify.myshopify.com",
  //   name: "Home",
  //   type: "page",
  // });
  const navigate = useNavigate();
  const pagesLinks = [
    {
      content: "Page index",
      helpText: "Page Index route",
      onAction: () => navigate("/pages"),
    },
    {
      content: "Page index",
      helpText: "Page General route",
      onAction: () => navigate("/pages/general"),
    },
  ];

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
                  <Heading>Nice work on building a Shopify app 🎉</Heading>
                  <p>
                    Your app is ready to explore! It contains everything you
                    need to get started including the{" "}
                    <Link url="https://polaris.shopify.com/" external>
                      Polaris design system
                    </Link>
                    ,{" "}
                    <Link url="https://shopify.dev/api/admin-graphql" external>
                      Shopify Admin API
                    </Link>
                    , and{" "}
                    <Link
                      url="https://shopify.dev/apps/tools/app-bridge"
                      external
                    >
                      App Bridge
                    </Link>{" "}
                    UI library and components.
                  </p>
                  <p>
                    Ready to go? Start populating your app with some sample
                    products to view and test in your store.{" "}
                  </p>
                  <p>
                    Learn more about building out your app in{" "}
                    <Link
                      url="https://shopify.dev/apps/getting-started/add-functionality"
                      external
                    >
                      this Shopify tutorial
                    </Link>{" "}
                    📚{" "}
                  </p>
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
          <ProductsCard />
        </Layout.Section>
        <Layout.Section fullWidth>
          <Card>
            <ActionList actionRole="menuitem" items={pagesLinks} />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
