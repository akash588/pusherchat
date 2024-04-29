import React from 'react';
import './MessageInput.css'; 

const MessageInput = ({ message, setMessage, handleKeyUp, sendMessage }) => {

  console.log("message",message);
  return (
    <div className="message-input-container"> 
      <textarea
        className="message-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={handleKeyUp}
        placeholder="Enter your message"
      />
      <button
        className="submit-button"
        onClick={sendMessage}
        disabled={!message.trim()} 
      >
        SUBMIT
      </button>
    </div>
  );
};

export default MessageInput;
