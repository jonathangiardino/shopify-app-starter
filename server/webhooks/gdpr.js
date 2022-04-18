export default function webhookGdprRoutes(app) {
  /*
        GDPR Webhooks 
        > Note: We return 200 as we don't currently store any information
        > Learn more: https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks
    */

  /*
        customers/redact
        > Delete data stored on a customer. The `customer_id` is provided in payload.
        > Learn more: https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks#customers-redact
    */
  app.post("/webhooks/customers/redact", async (req, res) => {
    try {
      res.status(200).send();
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
      res.status(500).send(error.message);
    }
  });

  /* 
        customers/data_request
        > Learn more: https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks#customers-data_request
        > Respond with any customer data store on your system. The `customer_id` is provided in payload.
    */
  app.post("/webhooks/customers/data_request", async (req, res) => {
    try {
      res.status(200).send();
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
      res.status(500).send(error.message);
    }
  });

  /*
        shop/redact
        > Erase store specific data
        > Learn more: https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks#shop-redact
    */
  app.post("/webhooks/shop/redact", async (req, res) => {
    try {
      res.status(200).send();
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
      res.status(500).send(error.message);
    }
  });
}
