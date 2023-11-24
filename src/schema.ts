// schema.ts

import mongoose, { Schema, Document } from "mongoose";

export interface CodeData {
  urlCode: string;
  sharedData: string;
}

export interface CodeDataDocument extends CodeData, Document {}

const codeDataSchema: Schema = new mongoose.Schema({
  urlCode: String,
  sharedData: String,
});

export const CodeDataModel = mongoose.model<CodeDataDocument>(
  "CodeData",
  codeDataSchema
);
