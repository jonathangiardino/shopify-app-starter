import { getTimestamp } from "../../utils/misc.js";
import { DB } from "../database/client.js";
import { updateShop } from "../database/shops/handlers.js";

export async function uninstall(shop) {
  try {
    await updateShop({
      shop,
      isInstalled: false,
      uninstalledAt: getTimestamp(),
    });
    await DB.from("sessions").delete().eq("shop", shop);

    console.log(
      `Webhook processed, removed shop ${shop} sessions and set state to uninstalled`
    );
  } catch (error) {
    console.log(`error`, error);
  }
}
