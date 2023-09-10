import { MongoClient } from "https://deno.land/x/mongo@v0.30.0/mod.ts";

  // Connecting to a Mongo Database
  const client = new MongoClient();


// Connecting to a Mongo Atlas Database
await client.connect(
  "mongodb+srv://shelby1508:manik83b@shelby1508-test.u18q7pi.mongodb.net/?authMechanism=SCRAM-SHA-1",
);

console.log('DB Connected!!')
 const db = client.database("shelby1508-test");

 export default  db;
  