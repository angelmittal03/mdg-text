import { Router } from "https://deno.land/x/oak/mod.ts";
import {signup, signin} from "../controllers/users.ts";
import { socketConnection } from "../controllers/webSocket.ts";
 const router = new Router();

router.post("/api/signup", signup)
router.post("/api/signin", signin);
router.get("api/start_web_socket" , socketConnection);

export default router;