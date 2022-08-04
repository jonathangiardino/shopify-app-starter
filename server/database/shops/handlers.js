import { DB } from "../client.js";

export async function getShop(shop) {
  try {
    const { data } = await DB.from("shops").select("*").eq("shop", shop);
    if (data) return data[0];
    return false;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createShop(shopData) {
  try {
    const { data } = await DB.from("shops").upsert([{ ...shopData }]);
    console.log(`~~~> ${shopData.shop} created...`);

    if (data) return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateShop(shopData) {
  try {
    const { data } = await DB.from("shops")
      .update([{ ...shopData }])
      .eq("shop", shopData.shop);

    console.log(`~~~> ${shopData.shop} updated...`);

    if (data) return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteShopData(shop) {
  try {
    await DB.from("shops").delete().eq("shop", shop);
    console.log(`~~~> ${shopData.shop} deleted...`);

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
