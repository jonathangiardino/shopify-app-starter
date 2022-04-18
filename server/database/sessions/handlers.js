import { Shopify } from "@shopify/shopify-api";
import { DB } from "../client.js";

async function storeCallback(session) {
  try {
    await DB.from("sessions").upsert([
      { id: session.id, session, shop: session.shop },
    ]);
    return true;
  } catch (err) {
    throw new Error(err);
  }
}

/*
        The loadCallback takes in the id, and uses the getAsync method to access the session data
        If a stored session exists, it's parsed and returned
        Otherwise, return undefined
    */
async function loadCallback(id) {
  try {
    const { data: validSession } = await DB.from("sessions")
      .select("*")
      .eq("id", id);

    if (!validSession || !validSession.length) return undefined;

    let session = new Shopify.Session.Session(validSession[0].id);
    session = Object.assign(session, validSession[0].session);

    return session;
  } catch (err) {
    throw new Error(err);
  }
}

/*
        The deleteCallback takes in the id, and deletes it from the store
        If the session can be deleted, return true
        Otherwise, return false
    */
async function deleteCallback(id) {
  try {
    await DB.from("sessions").delete().eq("id", id);
    return true;
  } catch (err) {
    throw new Error(err);
  }
}

export { storeCallback, loadCallback, deleteCallback };
