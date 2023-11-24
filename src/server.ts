import { connectToMongoDB } from "./connections";
import express from "express";
import cors from "cors";

console.log("manas");
connectToMongoDB();
const app = express();
const port = process.env.PORT || 40000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to code share by manas backend.");
});
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
