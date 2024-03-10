// schema.ts

import mongoose, { Schema, Document } from "mongoose";

export interface CodeData {
  urlCode: string;
  sharedData: string;
  languageName: string;
  isEditable:boolean;
  userId:string
}

export interface CodeDataDocument extends CodeData, Document {}

const codeDataSchema: Schema = new mongoose.Schema({
  urlCode: String,
  sharedData: String,
  languageName: String,
  isEditable:Boolean,
  userId:String
});

export const CodeDataModel = mongoose.model<CodeDataDocument>(
  "CodeData",
  codeDataSchema
);

// manasshrivastava0410;
// Manas4@sr

