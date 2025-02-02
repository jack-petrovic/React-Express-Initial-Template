import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import * as bodyParser from "express";
import { WebSocketServer } from "ws";

// env
dotenv.config();

// config app
const app = express();
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "500000gb" }));
app.use(bodyParser.urlencoded({ limit: "500000gb", extended: true }));
app.use(express.json());
app.use("/public", express.static("public"));



// Connect to WebSocket client
const wss = new WebSocketServer({
  port: 3381,
});
wss.on("connection", (ws) => {
  // When message is received from client
  ws.on("message", (data, isBinary) => {
    const message = isBinary ? data : data.toString();
    const parsedData = JSON.parse(message);
  });
});

const serverPost = process.env.SERVER_PORT || 3333;
const serverIP = process.env.SERVER_IP || "localhost";
app.listen(serverPost, serverIP, () => {
  console.info(`Listening at http://${serverIP}:${serverPost}`);
});
