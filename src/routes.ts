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
        isEditable: fileData.isEditable || existingFileData?.isEditable,
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

export default router;
// https://manascodeshare.onrender.com/code/post
// https://manascodeshare.onrender.com/code/get?urlCode=manas1
// https://manascodeshare.onrender.com/code/update
