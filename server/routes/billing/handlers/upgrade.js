import { Shopify } from "@shopify/shopify-api";
import { getShop } from "../../../database/shops/handlers.js";

export const subscriptionPlan = {
  key: "PRO",
  name: "Pro",
  price: "9.99",
  trialDuration: 14,
};

export const APP_SUBSCRIPTION_CREATE = `mutation appSubscribe(
  $name: String!
  $returnUrl: URL!
  $trialDays: Int!
  $test: Boolean!
  $price: Decimal!
) {
  appSubscriptionCreate(
    name: $name
    returnUrl: $returnUrl
    trialDays: $trialDays
    test: $test
    lineItems: [
      {
        plan: {
          appRecurringPricingDetails: {
            price: { amount: $price, currencyCode: USD }
          }
        }
      },
    ]
  ) {
    userErrors {
      field
      message
    }
    confirmationUrl
    appSubscription {
      id
    }
  }
}`;

export const upgrade = async (req, _res) => {
  const { session } = req;
  const shop = session.shop;

  try {
    // Fetch shopData
    const shopData = await getShop(shop);
    if (!shopData) {
      throw `Can't find shop of ${shop}`;
    }

    // Create Graphql Client
    const client = new Shopify.Clients.Graphql(shop, session.accessToken);

    const isTestCharge = shopDoc.shopData?.plan?.partnerDevelopment || false;

    const subscriptionInput = {
      name: `${subscriptionPlan.key}`,
      returnUrl: `${process.env.HOST}/api/billing/confirm?shop=${shop}`,
      trialDays: subscriptionPlan.trialDuration,
      test: isTestCharge,
      price: subscriptionPlan.price,
    };

    // Send Creation Query
    const res = await client.query({
      data: {
        query: APP_SUBSCRIPTION_CREATE,
        variables: subscriptionInput,
      },
    });

    if (!res?.body?.data?.appSubscriptionCreate?.confirmationUrl) {
      throw `Invalid payload returned for ${shop}`;
    }

    return res.body.data.appSubscriptionCreate.confirmationUrl;
  } catch (err) {
    throw err;
  }
};
