import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  const connectionString =
    "mongodb+srv://manasshrivastava0410:1HXEVp068zxB4iEG@cluster0.fcgbcxd.mongodb.net/?retryWrites=true&w=majority";

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
