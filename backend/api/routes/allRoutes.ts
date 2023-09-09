import { Router } from "https://deno.land/x/oak/mod.ts";
import {signup, signin} from "../controllers/users.ts";

 const route = new Router();

route.post("/api/signup", signup)
route.post("/api/signin", signin);


export default route;