import mongoose from "mongoose";

const codeDataSchema = new mongoose.Schema({
  urlCode: String,
  sharedData: String,
});

// Create book model
export const newDatatoShare = mongoose.model("newData", codeDataSchema);

// Insert a new dta into the database
export async function insertCodeData(db, newData) {
  try {
    const newCode = new newDatatoShare(newData);
    await db.save(newCode);
    console.log("Book inserted:", newCode);
  } catch (error) {
    console.error("Error inserting book:", error);
    throw error;
  }
}
// export const Admin = mongoose.model("Admin", adminSchema);
