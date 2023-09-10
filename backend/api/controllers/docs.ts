import db from "../database/connectionDB.ts";
import { DocSchema } from "../schema/docs.ts";
const Docs = db.collection<DocSchema>("docs");
console.log(Docs)
//Create Docs
export const createDoc = async({request,response}:{request:any;response:any}) => {
const {name, author,username} = await request.body().value;
let contributor = []
contributor.push(username)
console.log(name)
const _id = await Docs.insertOne({
    name: name,
    owner:username,
    author:author,
    content:"",
    contributor :contributor,
    view_only : [],
    contributor_code:crypto.randomUUID(),
    view_only_code :crypto.randomUUID()
    });
 response.body = {message:"doc created",id:_id}



}
export const updateDoc = async ({ request, response }: { request: any, response: any }) => {
    try {
      const { name, author, username, content } = await request.body().value;
  
      // Define the filter to find the document based on the name and owner
      const filter = {
        name: name,
      };
  
      // Define the update object to set the new content value
      const update = {
        $set: {
          content: content,
        },
      };
  
      // Use the updateOne method to find and update the document
      const document = await Docs.findOne(filter);
      console.log(document)
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
    console.log(request.url.search.split("name=")[1])
    try {
      const name = request.url.search.split("name=")[1];
      console.log(name)
  
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
        response.body = { message: result };
      }
    } catch (error) {
      console.error("Error:", error);
      response.status = 500;
      response.body = { error: "Internal Server Error" };
    }
  };
  
  export const readDoc = async ({ request, response }: { request: any, response: any }) => {
    try {
      const { name } = request.url.search.split("name=")[1];
  
      // Define the filter to find a single document based on the name, owner, and author
      const filter = {
        name: name,
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
  export const getAll = async ({ request, response }: { request: any, response: any }) => {
    try {
      const {username} = await request.body().value
      const docs = await Docs.find({owner:username})
      const arr = await docs.toArray()
      for(var i=0;i<arr.length;i++){
        console.log(arr[i])
      }
     console.log(typeof(docs))
     console.log(arr)
      response.body = {ls:arr}
    } catch (error) {
      console.error("Error:", error);
      response.status = 500;
      response.body = { error: "Internal Server Error" };
    }
  };
  export const addContributor = async ({request,response}:{request:any,response:any})=>{
    const {name,contributor_code,username} = await request.body().value
    const filter = {
      name:name,
      contributor_code:contributor_code
    }
    const doc = await Docs.findOne(filter)
    const arr = doc.contributor
    arr.push(username)
    if(doc){
      const update = {
        $set: {
          contributor: arr,
        },
      };
      const result = await Docs.updateOne(filter, update);
  
      if (result.matchedCount === 1) {
        response.status = 200;
        response.body = { message: "Document updated successfully." };
      } else {
        response.status = 404;
        response.body = { message: "Document not found." };
      }


    }
  }