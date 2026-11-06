import test from "node:test";
import assert from "node:assert/strict";
import { createApiServer } from "../src/server.js";

test("health endpoint reports service status", async t => {
  const server = createApiServer();
  await new Promise(resolve => server.listen(0, resolve));
  t.after(() => server.close());
  const base = `http://127.0.0.1:${server.address().port}`;
  const response = await fetch(base + "/health");
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok", service: "coreerp-api" });
});
