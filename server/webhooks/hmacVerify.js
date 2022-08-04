import crypto from "crypto";
import { Shopify } from "@shopify/shopify-api";

export const hmacVerify = (req, res, next) => {
  try {
    const generateHash = crypto
      .createHmac("SHA256", process.env.SHOPIFY_API_SECRET)
      .update(JSON.stringify(req.body), "utf8")
      .digest("base64");

    const hmac = req.headers["x-shopify-hmac-sha256"];

    if (Shopify.Utils.safeCompare(generateHash, hmac)) {
      console.log("HMAC successfully verified for webhook route.");
      next();
    } else {
      console.log("Shopify hmac verification for webhook failed, aborting.");
      return res.status(401).send();
    }
  } catch (error) {
    console.log("--> HMAC ERROR", error);
  }
};
