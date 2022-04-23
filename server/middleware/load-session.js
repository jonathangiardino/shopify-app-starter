import { Shopify } from "@shopify/shopify-api";

export default function loadSession(app) {
  return async (req, res, next) => {
    const session = await Shopify.Utils.loadCurrentSession(
      req,
      res,
      app.get("use-online-tokens")
    );

    req.session = session;
    next();
  };
}
