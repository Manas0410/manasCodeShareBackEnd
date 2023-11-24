const mongoose = require("mongoose");
//import {url} from "./../configuration"

export const connectToMongoDB = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/manasCodeShare", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

mongoose.connection.on("error", (err: any) => {
  console.log("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});
// export async function closeConnection() {
//   try {
//     await mongoose.connection.close();
//     console.log("MongoDB connection closed");
//   } catch (error) {
//     console.error("Error closing MongoDB connection:", error);
//     throw error;
//   }
// }
