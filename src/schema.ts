// schema.ts
import mongoose, { Schema, Document } from "mongoose";

export interface FileData {
  name: string;
  languageName: string;
  isEditable: boolean;
  data: string;
}

export interface CodeData {
  urlCode: string;
  sharedData: Map<string, FileData>;
  userId: string;
  createdAt: Date;
}

export interface CodeDataDocument extends CodeData, Document {}

const fileDataSchema: Schema = new mongoose.Schema({
  name: String,
  languageName: String,
  isEditable: Boolean,
  data: String,
});

const codeDataSchema: Schema = new mongoose.Schema({
  urlCode: String,
  sharedData: { type: Map, of: fileDataSchema, required: true },
  userId: String,
  createdAt: { type: Date, default: Date.now },
});

export const CodeDataModel = mongoose.model<CodeDataDocument>(
  "CodeData",
  codeDataSchema
);

// manasshrivastava0410;
// Manas4@sr

const FormatOfSharedData = {
  urlCode: "test",
  sharedData: {
    filename1: {
      name: "filename1",
      languageName: "",
      isEditable: "",
      data: "",
    },
    filename2: {
      name: "filename2",
      languageName: "",
      isEditable: "",
      data: "",
    },
  },
  userId: "manas0410",
  createdAt: { type: Date, default: Date.now },
};

// map meany multiple schema of 'of:'

// {
//   "_id": "66a63b2ada9d693b4c938816",
//   "urlCode": "qwerty",
//   "sharedData": {
//     "filename1": {
//       "name": "filename1",
//       "languageName": "",
//       "isEditable": true,
//       "data": "",
//       "_id": "66a63b2ada9d693b4c938817"
//     },
//     "filename2": {
//       "name": "filename2",
//       "languageName": "",
//       "isEditable": true,
//       "data": "",
//       "_id": "66a63b2ada9d693b4c938818"
//     }
//   },
//   "userId": "1xrt567",
//   "createdAt": "2024-07-28T12:35:54.268Z",
//   "__v": 0
// }
