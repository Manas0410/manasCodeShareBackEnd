// routes.ts

import express, { Request, Response } from "express";
import { CodeDataModel, CodeData } from "./schema";

const router = express.Router();

router.post("/post", async (req: Request, res: Response) => {
  try {
    const { urlCode, sharedData, languageName, isEditable, userId }: CodeData =
      req.body;

    if (!urlCode || !sharedData || !languageName) {
      return res
        .status(400)
        .json({ error: "urlCode, sharedData, and languageName are required." });
    }

    const newCodeData = new CodeDataModel({
      urlCode,
      sharedData,
      languageName,
      isEditable,
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

router.get("/get", async (req: Request, res: Response) => {
  try {
    const { urlCode } = req.query;

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
    const { urlCode, sharedData, languageName, isEditable }: CodeData =
      req.body;

    if (!urlCode) {
      return res.status(400).json({ error: "urlCode is a mandatory field" });
    }

    // Create an update object dynamically
    const updateFields: Partial<CodeData> = {};
    if (sharedData !== undefined) updateFields.sharedData = sharedData;
    if (languageName !== undefined) updateFields.languageName = languageName;
    if (isEditable !== undefined) updateFields.isEditable = isEditable;

    // Check if there are any fields to update
    if (Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json({ error: "No valid fields provided for update" });
    }

    const updatedCodeData = await CodeDataModel.findOneAndUpdate(
      { urlCode },
      { $set: updateFields },
      { new: true } // for returning the value after update
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
