import { connectToMongoDB } from "./connections";
import express from "express";
import cors from "cors";
import codeDataRoutes from "./routes";

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
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
