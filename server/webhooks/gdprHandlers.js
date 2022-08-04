import { deleteShopData } from "../database/shops/handlers.js";

export async function customerDataRequest(topic, shop, _webhookRequestBody) {
  try {
    // const {
    //     shop_domain,
    //     customer: { id, email },
    //     orders_requested,
    // } = JSON.parse(webhookRequestBody);

    console.log(`Handle ${topic} for ${shop}`);
  } catch (e) {
    console.error(e);
  }
}

export async function customerRedact(topic, shop, _webhookRequestBody) {
  try {
    // const {
    //     shop_domain,
    //     customer: { id, email },
    //     orders_to_redact,
    // } = JSON.parse(webhookRequestBody);

    console.log(`Handle ${topic} for ${shop}`);
  } catch (e) {
    console.error(e);
  }
}

export async function shopRedact(topic, shop, webhookRequestBody) {
  try {
    const { shop_domain } = JSON.parse(webhookRequestBody);

    await deleteShopData(shop_domain);

    console.log(`Handle ${topic} for ${shop}`);
  } catch (e) {
    console.error(e);
  }
}
