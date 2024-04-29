import React, { useState, useEffect, useRef } from 'react';
import Pusher from 'pusher-js';
import { useLocation } from "react-router-dom";
import './Chat.css';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const chatEndRef = useRef(null);
  const location = useLocation()

  let channelName = location.pathname.replace(/\/channel\//, "private-");
  useEffect(() => {
    const pusher = new Pusher('7d48e24cb34598cbf60c', {
      cluster: 'ap2',
      encrypted: true
    });
console.log("location.pathname",location.pathname,channelName);
    const channel = pusher.subscribe("chat");
    channel.bind('message', (data) => {
      console.log("data", data);
      setChatLog((prevChatLog) => [...prevChatLog, data]);
    });

    // Scroll to the latest message when chatLog changes
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }




    return () => {
      channel.unbind('message'); // Unbind the event listener when the component unmounts
      pusher.unsubscribe('chat');
    };
  }, []);


  const sendMessage = () => {
    fetch('http://localhost:3001/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message, channelId: channelName, user: 'User123' })
    });

    setMessage('');
  };

  return (
    <div className="chat-container">
      <div className="chat-log">
        {chatLog.map((chat, index) => (
          <div className={`message ${chat.user === 'User123' ? 'sent' : 'received'}`} key={index}>
            <div className="message-content">{chat.message}</div>
          </div>
        ))}
        <div ref={chatEndRef} /> {/* Empty div for scrolling to the latest message */}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;