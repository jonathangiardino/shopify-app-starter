import { Shopify } from "@shopify/shopify-api";
import { GET_SHOP_DATA } from "../../graphql/queries/shop.js";
import { getTimestamp } from "../../utils/misc.js";
import { createShop, getShop, updateShop } from "../database/shops/handlers.js";
import topLevelAuthRedirect from "../helpers/top-level-auth-redirect.js";
// import analytics from "../lib/segment/index.js";

export default function applyAuthMiddleware(app) {
  app.get("/auth", async (req, res) => {
    if (!req.signedCookies[app.get("top-level-oauth-cookie")]) {
      return res.redirect(
        `/auth/toplevel?${new URLSearchParams(req.query).toString()}`
      );
    }

    const redirectUrl = await Shopify.Auth.beginAuth(
      req,
      res,
      req.query.shop,
      "/auth/token",
      false
    );

    res.redirect(redirectUrl);
  });

  app.get("/auth/toplevel", (req, res) => {
    res.cookie(app.get("top-level-oauth-cookie"), "1", {
      signed: true,
      httpOnly: true,
      sameSite: "strict",
    });

    res.set("Content-Type", "text/html");

    res.send(
      topLevelAuthRedirect({
        apiKey: Shopify.Context.API_KEY,
        hostName: Shopify.Context.HOST_NAME,
        shop: req.query.shop,
      })
    );
  });

  app.get("/auth/token", async (req, res) => {
    await Shopify.Auth.validateAuthCallback(req, res, req.query);
    const redirectUrl = await Shopify.Auth.beginAuth(
      req,
      res,
      req.query.shop,
      "/auth/callback",
      app.get("use-online-tokens")
    );

    res.redirect(redirectUrl);
  });

  app.get("/auth/callback", async (req, res) => {
    let fetchShopData = true;

    try {
      const session = await Shopify.Auth.validateAuthCallback(
        req,
        res,
        req.query
      );

      const host = req.query.host;
      const response = await Shopify.Webhooks.Registry.registerAll({
        shop: session.shop,
        accessToken: session.accessToken,
      });

      console.log(`Registered webhooks:`);
      console.log(response);

      if (!response["APP_UNINSTALLED"].success) {
        console.log(
          `Failed to register APP_UNINSTALLED webhook: ${response.result}`
        );
      }

      const existingShop = await getShop(session.shop);
      const betaUsers = [""];

      if (!existingShop) {
        await createShop({
          shop: session.shop,
          scopes: session.scope,
          isInstalled: true,
          subscription: null,
          settings: null,
          installedAt: getTimestamp(),
          uninstalledAt: null,
          notifications: [],
          settings: { beta: betaUsers.includes(session.shop) ? true : false },
        });

        // Track install event
        // analytics.track({
        //   event: "install",
        //   userId: session.shop,
        // });
      } else if (!existingShop.isInstalled) {
        // This is a REINSTALL
        await updateShop({
          shop: session.shop,
          isInstalled: true,
          installedAt: getTimestamp(),
          uninstalledAt: null,
          showOnboarding: true,
          settings: { beta: betaUsers.includes(session.shop) ? true : false },
        });

        // Track reinstall event
        // analytics.track({
        //   event: "reinstall",
        //   userId: session.shop,
        // });
      } else {
        if (!!existingShop.shopData) {
          fetchShopData = false;
        }
      }

      if (fetchShopData) {
        const client = new Shopify.Clients.Graphql(
          session.shop,
          session.accessToken
        );

        // Track reauth event
        // analytics.track({
        //   event: "reauth",
        //   userId: session.shop,
        // });

        const res = await client.query({ data: GET_SHOP_DATA });

        if (!res?.body?.data?.shop) {
          console.warn(`Missing shop data on ${shop}`);
        } else {
          const shopData = res.body.data.shop;

          await updateShop({
            shop: session.shop,
            shopData,
          });
        }
      }

      // Redirect to app with shop parameter upon auth
      res.redirect(`/?shop=${session.shop}&host=${host}`);
    } catch (e) {
      switch (true) {
        case e instanceof Shopify.Errors.InvalidOAuthError:
          res.status(400);
          res.send(e.message);
          break;
        case e instanceof Shopify.Errors.CookieNotFound:
        case e instanceof Shopify.Errors.SessionNotFound:
          // This is likely because the OAuth session cookie expired before the merchant approved the request
          res.redirect(`/auth?shop=${req.query.shop}`);
          break;
        default:
          res.status(500);
          res.send(e.message);
          break;
      }
    }
  });
}
