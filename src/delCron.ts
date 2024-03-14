import { CodeDataModel } from "./schema";

export const deleteOldDocuments = async () => {
  try {
    // Calculate the date 24 hours ago
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Delete documents older than 24 hours
    await CodeDataModel.deleteMany({ createdAt: { $lt: twentyFourHoursAgo } });

    console.log("Old documents deleted successfully");
  } catch (error) {
    console.error("Error deleting old documents:", error);
  }
};
