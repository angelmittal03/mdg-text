import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import router from "./api/routes/allRoutes.ts";
const connectedClients = new Map();

const app = new Application();
const port = 8081;



app.use(router.routes());
app.use(router.allowedMethods());


console.log("Listening at http://localhost:" + port);
await app.listen({ port });
