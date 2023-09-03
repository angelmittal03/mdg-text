import { config } from "https://deno.land/x/dotenv@v3.2.2";
const { DATA_API_KEY, APP_ID } = config();

const BASE_URI = `hhttps://ap-south-1.aws.data.mongodb-api.com/app/data-uknse/endpoint/data/v1`;
const DATA_SOURCE = "Cluster0";
const DATABASE = "todo_db";
const COLLECTION = "todos";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "api-key": DATA_API_KEY 
  },
  body: ""
};