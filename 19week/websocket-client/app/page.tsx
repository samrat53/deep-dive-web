"use client";
import { useEffect, useState } from "react";

function useSocket() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [sendMessage, setSendMessage] = useState("");
  const [latestMessage, setLatestMessage] = useState("");
  
  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080`);
    socket.onopen = () => {
      console.log("Connected");
      setSocket(socket);
    };
    socket.onmessage = (message) => {
      setLatestMessage(message.data);
      console.log(`received message: ${message.data}`);
    };
    return () => {
      socket?.close();
    };
  }, []);
  return {socket,sendMessage, latestMessage,setSendMessage};
}

export default function Home() {
  const {socket,sendMessage,latestMessage,setSendMessage} = useSocket();

  if (!socket) return <div>Connecting to socket server</div>;

  return (
    <>
      <input
        type="text"
        placeholder="enter message"
        className="text-black"
        onChange={(e) => setSendMessage(e.target.value)}
      />
      <button
        className="m-5 px-2 bg-slate-500 rounded-md"
        onClick={() => {
          socket.send(sendMessage);
        }}
      >
        Send
      </button>
      <h1>Recieved Message:</h1>
      <div>{latestMessage}</div>
    </>
  );
}
