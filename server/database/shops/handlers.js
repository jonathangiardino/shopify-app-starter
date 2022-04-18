import { DB } from "../client.js";

export async function getShop(shop) {
  const { data, error } = await DB.from("shops").select("*").eq("shop", shop);

  if (error) throw new Error(error);
  if (data) return data[0];

  return false;
}

export async function createShop(shopData) {
  try {
    console.log(`~~~> Creating ${shopData.shop} in Supabase...`);
    const { data } = await DB.from("shops").upsert([{ ...shopData }]);

    console.log(`~~~> ${shopData.shop} created...`);

    if (data) return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateShop(shopData) {
  try {
    console.log(`~~~> Updating ${shopData.shop} in Supabase...`);
    const { data } = await DB.from("shops")
      .update([{ ...shopData }])
      .eq("shop", shopData.shop);

    console.log(`~~~> ${shopData.shop} updated...`);

    if (data) return data;
  } catch (error) {
    throw new Error(error);
  }
}
