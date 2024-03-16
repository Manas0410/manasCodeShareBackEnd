// import { connectToMongoDB } from "./connections";
// import express from "express";
// import cors from "cors";
// import codeDataRoutes from "./routes";
// import cron from "node-cron";
// import { deleteOldDocuments } from "./delCron";

// console.log("manas");

// async function startServer() {
//   try {
//     await connectToMongoDB();

//     const app = express();
//     const port = process.env.PORT || 3000;
//     app.use(express.json());
//     app.use(cors());

//     app.get("/code", (req, res) => {
//       res.send("Welcome to code share by manas backend.");
//     });
//     // Routes
//     app.use("/code", codeDataRoutes);
//     app.listen(port, () => {
//       console.log(`Server started at http://localhost:${port}`);
//     });

//     // Schedule deletion task to run every day at midnight
//     cron.schedule("0 2 * * *", deleteOldDocuments);

//     // Start the cron job
//     console.log("Deletion task scheduled to run every day at midnight");
//   } catch (error) {
//     console.error("Error starting server:", error);
//   }
// }

// startServer();

import express from "express";
import cors from "cors";
import http from "http";
import { Server, Socket } from "socket.io";
import { connectToMongoDB } from "./connections";
import codeDataRoutes from "./routes";
import cron from "node-cron";
import { deleteOldDocuments } from "./delCron";

async function startServer() {
  try {
    await connectToMongoDB();

    const app = express();
    const server = http.createServer(app);
    const io = new Server(server);

    // Middleware
    app.use(express.json());
    app.use(cors());

    // Routes
    app.get("/code", (req, res) => {
      res.send("Welcome to code share by manas backend.");
    });
    app.use("/code", codeDataRoutes);

    // Start the Express server
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });

    // Schedule deletion task to run every day at 2:00 AM
    cron.schedule("0 2 * * *", deleteOldDocuments);

    // Socket.IO connection handling
    io.on("connection", (socket: Socket) => {
      console.log("A user connected");

      // Handle incoming messages from clients
      socket.on("message", (message: string) => {
        console.log("Received message:", message);

        // Broadcast the message to all connected clients except the sender
        socket.broadcast.emit("message", message);
      });

      // Handle disconnection of clients
      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });

    console.log("Deletion task scheduled to run every day at 2:00 AM");
    return io;
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

const io = startServer();
export { io };
