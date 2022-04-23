import { composeGid } from "@shopify/admin-graphql-api-utilities";
import { Shopify } from "@shopify/shopify-api";
import { updateShop } from "../../../database/shops/handlers.js";

export const APP_SUBSCRIPTION_CANCEL = `mutation appSubscriptionCancel(
    $id: ID!
  ) {
    appSubscriptionCancel(
      id: $id
    ) {
      appSubscription {
        id
        status
      }
      userErrors {
        field
        message
      }
    }
}`;

export const downgrade = async (req, _res) => {
  const { session } = req;
  const shop = session.shop;

  try {
    // Retrieve shop data
    const shopData = await getShop(shop);
    if (!shopData) {
      throw `Shop ${shop} not found`;
    }

    // Store the active subscription charge id
    const chargeId = shopData.subscription?.chargeId;
    if (!chargeId) {
      throw `No charge id on ${shop}`;
    }

    // Create client
    const client = new Shopify.Clients.Graphql(shop, session.accessToken);

    // Send API request to cancel the subscription
    const res = await client.query({
      data: {
        query: APP_SUBSCRIPTION_CANCEL,
        variables: {
          id: `${composeGid("AppSubscription", chargeId)}`,
        },
      },
    });
    if (!res?.body?.data?.appSubscriptionCancel) {
      throw `Invalid payload returned for ${shop} on ${chargeId}`;
    }

    // Make sure the API call was successful
    const { status } = res.body.data.appSubscriptionCancel.appSubscription;
    if (status !== "CANCELLED") {
      throw `Status of CANCELLED expected but received ${status}`;
    }

    // / Delete subscription
    const dbResponse = await updateShop({
      shop,
      subscription: null,
      hasPreviouslySubscribed: true,
    });

    if (!dbResponse) {
      throw `Could not update db`;
    }

    // Segment Analytics TODO: add analytics
    // analytics &&
    //   analytics.track({
    //     userId: shop,
    //     event: "Subscription deactivated",
    //     properties: {
    //       chargeId: shopData.subscription.chargeId,
    //       name: shopData.subscription.name,
    //       price: shopData.subscription.price,
    //       isTest: shopData.subscription.test,
    //       status: shopData.subscription.status,
    //       trialDuration: shopData.subscription.trialDays,
    //     },
    //   });

    console.log(
      `${shopData.shop} downgraded to free plan. Cancelled charge id: ${chargeId}`
    );

    return { success: true };
  } catch (err) {
    console.warn("err!!");
    throw err;
  }
};
