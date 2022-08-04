import express from "express";
import {
  customerDataRequest,
  customerRedact,
  shopRedact,
} from "./gdprHandlers.js";

const gdprRoutes = express.Router();

gdprRoutes.post("/:topic", async (req, res) => {
  const { body } = req;
  const { topic } = req.params;
  const shop = req.body.shop_domain;

  let response;

  switch (topic) {
    case "customers_data_request":
      response = await customerDataRequest(topic, shop, body);
      break;
    case "customers_redact":
      response = await customerRedact(topic, shop, body);
      break;
    case "shop_redact":
      response = await shopRedact(topic, shop, body);
      break;
    default:
      console.log("--> Unidentified GDPR Topic");
      break;
  }

  if (response && response.success) {
    res.status(200).send();
  } else {
    res.status(400).send("Error with mandatory GDPR webhooks");
  }
});

export default gdprRoutes;
