// routes.ts

import express, { Request, Response } from "express";
import { CodeDataModel, CodeData, FileData } from "./schema";

const router = express.Router();

router.post("/post", async (req: Request, res: Response) => {
  try {
    const { urlCode, sharedData, userId }: CodeData = req.body;

    if (!urlCode || !sharedData) {
      return res
        .status(400)
        .json({ error: "urlCode, sharedData, and languageName are required." });
    }

    const newCodeData = new CodeDataModel({
      urlCode,
      sharedData,
      userId,
      createdAt: new Date(), // Set createdAt field to current date and time
    });

    await newCodeData.save();

    return res.status(201).json(newCodeData);
  } catch (error) {
    console.error("Error saving data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get/:urlCode", async (req: Request, res: Response) => {
  try {
    const { urlCode } = req.params;

    if (!urlCode) {
      return res
        .status(400)
        .json({ error: "urlCode is required in the query parameters." });
    }

    const codeData = await CodeDataModel.findOne({ urlCode });

    if (!codeData) {
      return res
        .status(404)
        .json({ error: "Data not found for the given urlCode." });
    }

    return res.status(200).json(codeData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update", async (req: Request, res: Response) => {
  try {
    const { urlCode, fileData } = req.body;

    if (!urlCode || !fileData || !fileData.name) {
      return res.status(400).json({
        error: "urlCode and fileData with a name are mandatory fields",
      });
    }
    const existingCodeData: CodeData | null = await CodeDataModel.findOne({
      urlCode,
    });
    const existingFileData: FileData | undefined =
      existingCodeData?.sharedData.get(fileData.name);

    const updateFields = {
      [`sharedData.${fileData.name}`]: {
        name: fileData.name,
        languageName: fileData.languageName || existingFileData?.languageName,
        isEditable:
          typeof fileData.isEditable === "boolean"
            ? fileData.isEditable
            : existingFileData?.isEditable,
        data:
          fileData.data === "" ? "" : fileData.data || existingFileData?.data,
      },
    };

    const updatedCodeData = await CodeDataModel.findOneAndUpdate(
      { urlCode },
      { $set: updateFields },
      { new: true, upsert: true } // upsert creates if it doesn't exist
    );

    if (!updatedCodeData) {
      return res
        .status(404)
        .json({ error: "Data not found for the given urlCode." });
    }

    return res.status(200).json(updatedCodeData);
  } catch (error) {
    console.error("Error updating data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/deleteFile", async (req: Request, res: Response) => {
  const { fileName, urlCode } = req.body;

  if (!fileName || !urlCode) {
    return res
      .status(400)
      .json({ error: "fileName and urlCode are required fields" });
  }

  try {
    const document = await CodeDataModel.findOne({ urlCode });

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    // If sharedData is a Map, use .get() to check if the file exists
    const fileData = document.sharedData.get(fileName);

    if (!fileData) {
      return res.status(404).json({ error: "File not found" });
    }

    // Use .delete() method to remove the file from the Map
    document.sharedData.delete(fileName);

    // Save the updated document
    await document.save();

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// payload for updation and creating new file
// {
//     "urlCode":"test",
//     "fileData":{
//       "name": "filename3",
//       "languageName": "f3data",
//       "isEditable": false,
//       "data": ""
//     }
// }

export default router;
