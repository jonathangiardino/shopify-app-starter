import { Shopify } from "@shopify/shopify-api";
import { updateShop } from "../../../database/shops/handlers.js";
// import analytics from "../../../lib/segment/index.js";

const GET_ACTIVE_SUBSCRIPTION = `{ 
	appInstallation {
        activeSubscriptions {
            test
            createdAt
            currentPeriodEnd
            name
            trialDays
            status
        }
    }
}`;

export const confirm = async (req, _res) => {
  const { charge_id, shop } = req.query;

  try {
    // Create client
    const session = await Shopify.Utils.loadOfflineSession(shop);
    const client = new Shopify.Clients.Graphql(shop, session.accessToken);

    // // Send API request to get the active subscription
    const res = await client.query({
      data: GET_ACTIVE_SUBSCRIPTION,
    });
    if (
      !res?.body?.data?.appInstallation?.activeSubscriptions ||
      !res.body.data.appInstallation.activeSubscriptions.length
    ) {
      throw `Invalid payload returned for ${shop} on ${charge_id}`;
    }

    // // Get the active subscription
    const activeSubscription =
      res?.body?.data?.appInstallation?.activeSubscriptions[0];
    if (activeSubscription.status !== "ACTIVE") {
      throw `${shop} subscription status is not active on charge_id ${charge_id}`;
    }

    const subscriptionData = {
      chargeId: charge_id,
      plan: "PRO", // TODO: add query parameter
      status: activeSubscription.status,
      test: activeSubscription.test,
      trialDays: activeSubscription.trialDays,
      currentPeriodEnd: activeSubscription.currentPeriodEnd,
      createdAt: activeSubscription.createdAt,
      upgradedAt: new Date(),
    };

    // Update shopDoc
    await updateShop({ shop, subscription: subscriptionData });

    // analytics.track({
    //   userId: shop,
    //   event: "Subscription activated",
    //   properties: subscriptionData,
    // });

    return { success: true, shop };
  } catch (err) {
    throw err;
  }
};
