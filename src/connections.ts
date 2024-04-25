import mongoose from "mongoose";
import "dotenv/config";

export const connectToMongoDB = async () => {
  const { MONGO_CONNECTION_STRING } = process.env;
  const connectionString = MONGO_CONNECTION_STRING;

  if (!connectionString) {
    throw new Error("MongoDB connection string is not defined");
  }

  try {
    await mongoose.connect(connectionString);
    console.log("Connected successfully to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    throw error;
  }
};

// export async function closeConnection() {
//   try {
//     await mongoose.connection.close();
//     console.log("MongoDB connection closed");
//   } catch (error) {
//     console.error("Error closing MongoDB connection:", error);
//     throw error;
//   }
// }
