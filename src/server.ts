import { connectToMongoDB } from "./connections";
import express from "express";
import cors from "cors";
import codeDataRoutes from "./routes";
import cron from "node-cron";
import { deleteOldDocuments } from "./delCron";
import http from "http";
import { Server } from "socket.io";
console.log("manas");

async function startServer() {
  try {
    await connectToMongoDB();

    const app = express();
    const server = http.createServer(app);

    // socket connection
    const io = new Server(server, {
      cors: {
        origin: "*",
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log(`a user connected ${socket.id}`);

      socket.on("send_message", (data) => {
        for (let [id, socketInstance] of io.sockets.sockets) {
          if (id !== socket.id) {
            socketInstance.emit("receive_message", data);
          }
        }
        // socket.broadcast.emit("receive_message", data); //
      });
    });

    // port
    const port = process.env.PORT || 3000;

    // middlewares
    app.use(express.json());
    app.use(cors());

    app.get("/", (req, res) => {
      res.send("Welcome to code share by manas backend.");
    });

    // Routes
    app.use("/code", codeDataRoutes);

    //
    server.listen(port, () => {
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
