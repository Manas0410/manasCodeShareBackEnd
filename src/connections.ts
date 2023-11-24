const mongoose = require("mongoose");
export const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/manasCodeShare", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
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
