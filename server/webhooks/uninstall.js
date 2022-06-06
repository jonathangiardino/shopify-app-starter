import { getTimestamp } from "../../utils/misc.js";
import { DB } from "../database/client.js";
import { updateShop } from "../database/shops/handlers.js";
// import analytics from "../lib/segment/index.js";

export async function uninstall(shop) {
  try {
    await updateShop({
      shop,
      isInstalled: false,
      uninstalledAt: getTimestamp(),
    });
    await DB.from("sessions").delete().eq("shop", shop);

    // analytics.track({
    //   event: "uninstall",
    //   userId: shop,
    // });

    console.log(
      `Webhook processed, removed shop ${shop} sessions and set state to uninstalled`
    );
  } catch (error) {
    console.log(`error`, error);
  }
}
