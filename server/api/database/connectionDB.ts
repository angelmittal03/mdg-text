import { MongoClient } from "https://deno.land/x/mongo@v0.30.0/mod.ts";
import { load } from "https://deno.land/std/dotenv/mod.ts";

const env = await load();
  // Connecting to a Mongo Database
  const client = new MongoClient();


// Connecting to a Mongo Atlas Database
await client.connect(
  env["URL"]
);

console.log('DB Connected!!')
 const db = client.database("shelby1508-test");

 export default  db;
  