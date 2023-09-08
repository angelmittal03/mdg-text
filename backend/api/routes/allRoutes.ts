import { Router } from "https://deno.land/x/oak/mod.ts";
import {signup, signin} from "../controllers/users.ts";
import { createDoc, deleteDoc, readDoc, updateDoc } from "../controllers/docs.ts";
 const route = new Router();

route.post("/api/signup", signup)
route.post("/api/signin", signin);
route.get("/api/doc/createDoc",createDoc)
route.get("/api/doc/updateDoc",updateDoc)
route.get("/api/doc/deleteDoc",deleteDoc)
route.get("/api/doc/readDoc",readDoc)

export default route;