import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import socketIO from "socket.io-client";
import "./Chat.css";
import sendLogo from "../../Components/images/send.png";
// console.log(user);
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../images/closeIcon.png";

let socket;

const ENDPOINT = "https://chatapp-backend-h54z.onrender.com/";

const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      // alert("Connected");
      setId(socket.id);
    });
    // sending to backend with emit as object
    socket.emit("joined", { user });
    // console.log(socket);

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);

      // console.log(data.user, data.message);
    });
    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);

      console.log(data.user, data.message, data.id);
    });

    // socket off is done why?
    // because once the message comes then we don't need it to be rendered multiple
    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>C CHAT</h2>

          {/* Now we want reload so we are using anchor tag instead of Link tag because 
            link tage used to change component without refresh */}
          <a href="/">
            <img src={closeIcon} alt="Close" />
          </a>
        </div>

        {/*
            Below line react scrollto bottom will  make the messages appear at last;
        */}
        {/*
          Now Item is an object which contains user,messages and id  */}

        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => {
            console.log("Current message:", item);
            return (
              <Message
                key={i}
                message={item.message}
                classs={item.id === id ? "right" : "left"}
                user={item.id === id ? "" : item.user}
              />
            );
          })}
        </ReactScrollToBottom>

        <div className="inputBox">
          <input
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              send();
            }
          }}
            type="text"
            id="chatInput"
          />
          <button className="sendBtn" onClick={send}>
            <img src={sendLogo} alt="SendImage" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
