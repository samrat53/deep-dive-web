// Websockets on express
import express from "express";
import { WebSocket, WebSocketServer } from "ws";

const app = express();
const httpServer = app.listen(8080,() => console.log("Port Up 8080"));

const wss = new WebSocketServer({ server: httpServer});

wss.on("connection",(socket) => {
    socket.on("error", console.error);

    socket.on("message", (data, isBinary) => {
        wss.clients.forEach((client) => {
            if(client.OPEN) {
                client.send(data, {binary: isBinary});
            }
        })
    })

    socket.send("User connected to serverr");
})