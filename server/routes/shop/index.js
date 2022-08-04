import { Shopify } from "@shopify/shopify-api";
import loadSession from "../../middleware/load-session.js";
import verifyRequest from "../../middleware/verify-request.js";
import { GET_SHOP_DATA } from "../../../graphql/queries/shop.js";
import { getShop, updateShop } from "../../database/shops/handlers.js";

const shopEndpoint = "/api/shop";

export default function shopRoute(app) {
  // GET api/shop -> Get shop info
  app.get(
    `${shopEndpoint}`,
    verifyRequest(app),
    loadSession(app),
    async (req, res) => {
      try {
        const { session } = req;
        const { shop, accessToken } = session;
        const currentUser = session.onlineAccessInfo.associated_user;

        const client = new Shopify.Clients.Graphql(shop, accessToken);

        const response = await client.query({
          data: GET_SHOP_DATA,
        });

        res.status(200).send({ ...response.body, currentUser });
      } catch (error) {
        console.log(`Failed to process api request: ${error}`);
        res.status(500).send(error.message);
      }
    }
  );

  app.get(
    `${shopEndpoint}/info`,
    verifyRequest(app),
    loadSession(app),
    async (req, res) => {
      try {
        const { session } = req;
        const { shop } = session;

        const shopInfo = await getShop(shop);

        res.status(200).send(shopInfo);
      } catch (error) {
        console.log(`Failed to process api request: ${error}`);
        res.status(500).send(error.message);
      }
    }
  );

  app.post(
    `${shopEndpoint}/update`,
    verifyRequest(app),
    loadSession(app),
    async (req, res) => {
      try {
        const { session } = req;
        const { shop } = session;

        const shopInfo = await updateShop({ shop, ...req.body });

        res.status(200).send(shopInfo);
      } catch (error) {
        console.log(`Failed to process api request: ${error}`);
        res.status(500).send(error.message);
      }
    }
  );
}
