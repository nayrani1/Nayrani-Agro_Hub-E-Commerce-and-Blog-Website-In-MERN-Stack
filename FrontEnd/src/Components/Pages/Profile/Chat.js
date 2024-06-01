import React, { useEffect, useRef, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBTypography,
  MDBCardFooter,
} from "mdb-react-ui-kit";

const ChatUI = () => {
  const [messages, setMessages] = useState([
    { text: "hi how are you", sender: "other" },
    { text: "hi how are you", sender: "other" },
    { text: "hi how are you", sender: "other" },
    { text: "hi how are you", sender: "other" },
    { text: "hi how are you", sender: "other" },
    { text: "hi how are you", sender: "other" },
    { text: "hi how are you", sender: "other" },
    { text: "hi how are you", sender: "other" },
    { text: "hi how are you", sender: "other" },
    { text: "hi how are you", sender: "other" },
    { text: "hi how are you", sender: "other" },
    { text: "hi how are you", sender: "other" },
    { text: "hi how are you", sender: "other" },
    { text: "hi how are you", sender: "other" },
    { text: "hi how are you", sender: "other" },
    { text: "hi how are you", sender: "other" },
    { text: "hi how are you", sender: "other" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: "me" }]);
      setNewMessage("");
    }
  };
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <MDBCard
      style={{ height: "80vh", display: "flex", flexDirection: "column" }}
    >
      <MDBCardBody
        className="d-flex align-items-center p-3 sticky-top bg-white"
        style={{
          borderBottom: "1px solid #e0e0e0",
          top: 0,
          zIndex: 1,
        }}
      >
        <div className="pr-3">
          <img
            src="https://res.cloudinary.com/djljb8aby/image/upload/v1716712819/AgroHub/Users/vxgbf5etw9pnmetnqqrg.jpg"
            alt=""
            width={80}
            height={80}
          />
        </div>
        <div>
          <MDBTypography tag="h5" className="mb-0">
            Mr. Nayrani
          </MDBTypography>
          <MDBTypography tag="small" className="text-muted">
            Online
          </MDBTypography>
        </div>
      </MDBCardBody>

      <MDBCardBody
        className="flex-grow-1 overflow-auto p-3"
        style={{ height: "60vh" }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`d-flex mb-3 ${
              message.sender === "me"
                ? "justify-content-end"
                : "justify-content-start"
            }`}
          >
            <MDBCard
              className={`p-2 ${
                message.sender === "me"
                  ? "bg-primary text-white"
                  : "bg-light text-dark"
              }`}
            >
              {message.text}
            </MDBCard>
          </div>
        ))}
        <div ref={chatEndRef} />
      </MDBCardBody>

      <MDBCardFooter
        className="d-flex align-items-center p-3 sticky-bottom bg-white"
        style={{ borderTop: "1px solid #e0e0e0", bottom: 0, zIndex: 1 }}
      >
        <MDBInput
          value={newMessage}
          placeholder="Type Your Message..."
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow-1 me-2"
        />
        <MDBBtn color="primary" onClick={handleSend}>
          Send
        </MDBBtn>
      </MDBCardFooter>
    </MDBCard>
  );
};

export default ChatUI;
