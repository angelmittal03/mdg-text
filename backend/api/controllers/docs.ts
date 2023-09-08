import db from "../database/connectionDB.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { DocSchema } from "../schema/docs.ts";
import { create } from "https://deno.land/x/djwt@v2.4/mod.ts";
import { key } from "../utils/apiKey.ts";
const Docs = db.collection<DocSchema>("docs");

//Create Docs
export const createDoc = async({request,response}:{request:any,response:any})=>{
const {name, author,username} = await request.body().value;
const _id = await Docs.insertOne({
    name: name,
    owner:username,
    author:author,
    content:"",
    contributor :[],
    view_only : [],
    contributor_code:crypto.randomUUID(),
    view_only_code :crypto.randomUUID()
    });
}
export const updateDoc = async ({ request, response }: { request: any, response: any }) => {
    try {
      const { name, author, username, content } = await request.body().value;
  
      // Define the filter to find the document based on the name and owner
      const filter = {
        name: name,
        owner: username,
        author: author,
      };
  
      // Define the update object to set the new content value
      const update = {
        $set: {
          content: content,
        },
      };
  
      // Use the updateOne method to find and update the document
      const document = await Docs.findOne(filter);
      if(document){
        if(document.contributor.includes(username)){
            const result = await Docs.updateOne(filter, update);
  
      if (result.matchedCount === 1) {
        response.status = 200;
        response.body = { message: "Document updated successfully." };
      } else {
        response.status = 404;
        response.body = { message: "Document not found." };
      }
        }else{
            response.status = 404;
            response.body = {error:"not allowed"}
        }

      }
      
    } catch (error) {
      console.error("Error:", error);
      response.status = 500;
      response.body = { error: "Internal Server Error" };
    }
  };
  
  export const deleteDoc = async ({ request, response }: { request: any, response: any }) => {
    try {
      const { name,owner } = request.url.params;
  
      // Define the filter to find the document based on the name, owner, and author
      const filter = {
        name: name,
      };
  
      // Use the deleteOne method to delete the first document that matches the filter
      const result = await Docs.deleteOne(filter);
  
      if (result.deletedCount === 1) {
        response.status = 200;
        response.body = { message: "Document deleted successfully." };
      } else {
        response.status = 404;
        response.body = { message: "Document not found." };
      }
    } catch (error) {
      console.error("Error:", error);
      response.status = 500;
      response.body = { error: "Internal Server Error" };
    }
  };
  
  export const readDoc = async ({ request, response }: { request: any, response: any }) => {
    try {
      const { name, author, username } = await request.queryParams;
  
      // Define the filter to find a single document based on the name, owner, and author
      const filter = {
        name: name,
        owner: username,
        author: author,
      };
  
      // Use the findOne method to fetch a single document that matches the filter criteria
      const document = await Docs.findOne(filter);
  
      if (document) {
        response.status = 200;
        response.body = { document };
      } else {
        response.status = 404;
        response.body = { message: "Document not found." };
      }
    } catch (error) {
      console.error("Error:", error);
      response.status = 500;
      response.body = { error: "Internal Server Error" };
    }
  };
  