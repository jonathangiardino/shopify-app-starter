import request from "supertest";
import { describe, expect, test } from "vitest";
import { serve } from "../../__tests__/serve.js";

describe("webhooks gdpr routes", async () => {
  // this is only used to grab app wide constants
  const { app } = await serve(process.cwd(), false);

  test("/webhooks/shop/redact returns 200", async () => {
    const response = await request(app).post("/webhooks/shop/redact").send();

    expect(response.status).toBe(200);
  });

  test("/webhooks/customers/redact returns 200", async () => {
    const response = await request(app)
      .post("/webhooks/customers/redact")
      .send();

    expect(response.status).toBe(200);
  });

  test("/webhooks/customers/data_request returns 200", async () => {
    const response = await request(app)
      .post("/webhooks/customers/data_request")
      .send();

    expect(response.status).toBe(200);
  });
});
