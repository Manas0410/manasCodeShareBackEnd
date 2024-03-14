import { connectToMongoDB } from "./connections";
import express from "express";
import cors from "cors";
import codeDataRoutes from "./routes";
import cron from "node-cron";
import { deleteOldDocuments } from "./delCron";

console.log("manas");

async function startServer() {
  try {
    await connectToMongoDB();

    const app = express();
    const port = process.env.PORT || 3000;
    app.use(express.json());
    app.use(cors());

    app.get("/code", (req, res) => {
      res.send("Welcome to code share by manas backend.");
    });
    // Routes
    app.use("/code", codeDataRoutes);
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });

    // Schedule deletion task to run every day at midnight
    cron.schedule("0 2 * * *", deleteOldDocuments);

    // Start the cron job
    console.log("Deletion task scheduled to run every day at midnight");
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
