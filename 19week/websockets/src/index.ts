// import WebSocket, { WebSocketServer } from "ws";
// import http from "http";

// const server = http.createServer((req, res) => {
//     console.log(new Date() + " Received request for " + req.url);
//     res.end("hi from end");
// });

// const wss = new WebSocketServer({ server });

// let userCount=0;
// wss.on("connection", (socket) => {
//     socket.on("error", console.error);

//     socket.on("message", (data,isBinary) => {
//         wss.clients.forEach((client) => {
//             if (client.readyState === WebSocket.OPEN) {
//                 client.send(data,{binary:isBinary});
//             }
//         });
//     });
//     console.log('No of users', ++userCount);
//     socket.send("Hello! message  from server!!");
// });

// server.listen(8080, () =>
//     console.log(new Date() + " Server is listening on port 8080")
// );

// using express

import express from "express";
import WebSocket, { WebSocketServer } from "ws";

const app = express();
const httpServer = app.listen(8080, () =>
    console.log(new Date() + " Server is listening on port 8080")
);

const wss = new WebSocketServer({ server: httpServer });

let userCount = 0;
wss.on("connection", function connection(socket) {
    socket.on("error", console.error);

    socket.on("message", function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    console.log(++userCount, " users are live");
    socket.send("Hello! Message From Server!!");
});
