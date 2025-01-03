// "use client" in Nextjs so that while serverside rendering of page, the connection is not created at the server, but is rather created at the client side

import { useState, useEffect } from "react";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null); 
  const [messages, setMessages] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log("connected");
      setSocket(newSocket);
    }
    newSocket.onmessage = (message) => {
      console.log('Received message\n',message.data);
      setMessages((m) => [...m, message.data]);
    }
    return () => newSocket.close();
  },[])
  
  if(!socket) return <h1> Loading.... </h1>
  return (
    <>
    <div>
      All messages
      {messages.map((msg) => {
        return <div>{msg}</div>
      })}
    </div>
    <div>Send message
      <br/>
      <input type="text" placeholder={(userInput.length > 0) ? userInput: "Send Text"} onChange={(e) => {setUserInput(e.target.value)}}/>
      <button onClick={() => {
        socket.send(userInput);
        setUserInput("");
      }}>Send</button>
    </div>
    </>
  )
}

export default App
