import { Router } from "https://deno.land/x/oak/mod.ts";
import {signup, signin,} from "../controllers/users.js";
import { addContributor, createDoc, deleteDoc, getAll, readDoc, updateDoc } from "../controllers/docs.js";
 const route = new Router();

route.post("/api/signup", signup)
route.post("/api/signin", signin);
route.post("/api/doc/createDoc",createDoc)
route.post("/api/doc/updateDoc",updateDoc)
route.get("/api/doc/deleteDoc",deleteDoc)
route.post("/api/doc/readDoc",readDoc)
route.post("/api/doc/getAll",getAll)
route.post("/api/doc/addContributor",addContributor)

export default route;