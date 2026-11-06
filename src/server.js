import { createServer } from "node:http";

const collections = { products: [], customers: [], orders: [] };
let nextId = 1;

function send(res, status, payload) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}
async function readBody(req) {
  let raw = "";
  for await (const chunk of req) raw += chunk;
  if (!raw) return {};
  try { return JSON.parse(raw); } catch { throw new Error("invalid_json"); }
}
function validResource(kind, body) {
  if (kind === "products") return typeof body.name === "string" && body.name.trim() && Number.isInteger(body.priceCents) && body.priceCents >= 0;
  if (kind === "customers") return typeof body.name === "string" && body.name.trim() && typeof body.email === "string" && body.email.includes("@");
  if (kind === "orders") return typeof body.customerId === "string" && Array.isArray(body.items) && body.items.length > 0 && body.items.every(i => typeof i.productId === "string" && Number.isInteger(i.quantity) && i.quantity > 0);
  return false;
}
export function createApiServer() {
  return createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");
    if (req.method === "GET" && url.pathname === "/health") return send(res, 200, { status: "ok", service: "coreerp-api" });
    const [, kind, id] = url.pathname.split("/");
    if (!Object.hasOwn(collections, kind)) return send(res, 404, { error: "route_not_found" });
    if (req.method === "GET" && !id) return send(res, 200, { data: collections[kind] });
    if (req.method === "GET" && id) {
      const item = collections[kind].find(x => x.id === id);
      return item ? send(res, 200, { data: item }) : send(res, 404, { error: "not_found" });
    }
    if (req.method === "POST" && !id) {
      let body;
      try { body = await readBody(req); } catch { return send(res, 400, { error: "invalid_json" }); }
      if (!validResource(kind, body)) return send(res, 422, { error: "validation_failed" });
      if (kind === "orders" && !collections.customers.some(c => c.id === body.customerId)) return send(res, 422, { error: "customer_not_found" });
      const item = { ...body, id: String(nextId++), createdAt: new Date().toISOString() };
      collections[kind].push(item);
      return send(res, 201, { data: item });
    }
    return send(res, 405, { error: "method_not_allowed" });
  });
}
if (process.env.NODE_ENV !== "test") {
  const port = Number(process.env.PORT ?? 3000);
  createApiServer().listen(port, () => console.log(`CoreERP API listening on :${port}`));
}
