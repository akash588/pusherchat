import React from 'react';

const UserTypingStatus = ({ userinfo, userTyping }) => {
  const isUserTyping = userinfo.userName === userTyping.username;
  const typingAlignment = isUserTyping ? 'flex-end' : 'flex-start';
  const typingMargin = isUserTyping ? '0' : 'auto';
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', alignItems: typingAlignment }}>
      <div className="chat-bubble">
        <div className="typing">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="dot"></div>
          ))}
        </div>
      </div>
      <span style={{ marginLeft: typingMargin }}>{userTyping.userName} is typing</span>
    </div>
  );
};

export default UserTypingStatus;
