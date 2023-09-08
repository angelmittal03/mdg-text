import {ObjectId} from "https://deno.land/x/mongo@v0.30.0/mod.ts";

export interface DocSchema {
    _id: ObjectId,
    name: string,
    owner: string,
    author:string,
    content:string,
    contributor : [],
    view_only : []
    contributor_code:string
    view_only_code : string
  }
  