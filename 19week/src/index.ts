// Web Socket server in http, not using express.js

import WebSocket, { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer((req, res) => {
    console.log(new Date() + " received request for " + req.url);
    res.end("Hello from server 1 of Samrat");
});

const wss = new WebSocketServer({ server });

let users = 0;
wss.on("connection", function connect(socket) {
    socket.on("error", (err) => console.log(err));
    
    socket.on("message", function message(data, isBinary) {
        wss.clients.forEach((client) => {
            if (client.OPEN) {
                client.send(data, {binary: isBinary});
            }
        });
    });
    console.log(`user connected, total users = ${++users}`)
    socket.send('Hello From server');
});

server.listen(8080, () => {
    console.log(new Date() + ' server is running on port 8080');
})