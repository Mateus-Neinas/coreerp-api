import { createApiServer } from "./server.js";

const port = Number(process.env.PORT ?? 3000);
createApiServer().listen(port, () => console.log(`CoreERP API listening on :${port}`));
