// ChatMessages.js
import React from 'react';
import '../../styles/common.css'

const ChatMessages = ({ chatLog, userinfo }) => {


  const renderMessage = (message) => {

    const urlRegex = /(https?:\/\/\S+)/g;
    return message.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <div key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <a href={part} target="_blank" rel="noopener noreferrer" style={{ display: 'none' }}>
              {part}
            </a>
            <button
              onClick={() => window.open(part, '_blank')}
              className="viewButton"
            >
              View File
            </button>
          </div>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };


  return (
    <>
      {chatLog.map((chatInfo, i) => (
        <>
          <div
            key={i}
            className='chatMessageContainer'
            style={{
              fontFamily: 'Poppins',
              alignItems: userinfo.userName === chatInfo.user.username ? 'flex-end' : 'flex-start',
              marginLeft: userinfo.userName === chatInfo.user.username ? 'auto' : '0',
              marginRight: userinfo.userName !== chatInfo.user.username ? 'auto' : '0',
            }}
          >

            {renderMessage(chatInfo.message)}
          </div>
          <div style={{
            alignItems: userinfo.userName === chatInfo.user.username ? 'flex-end' : 'flex-start',
            marginLeft: userinfo.userName === chatInfo.user.username ? 'auto' : '0',
            marginRight: userinfo.userName !== chatInfo.user.username ? 'auto' : '0',
          }}>
            <div style={{ display: 'flex', margin: "3px", flexDirection: userinfo.userName === chatInfo.user.username ? 'row-reverse' : 'row', }}>
              <div >
                <img
                  src={"https://i.pravatar.cc/300"}
                  alt="User Avatar"
                  className='avatarContainer'
                />
              </div>
              <div style={{ display: 'flex', flexDirection: "column" }}>
                <span style={{ height: '20px', color: '#000000', fontFamily: 'Poppins, sans-serif' }}>{chatInfo.timestamp}</span>
                <span style={{ fontFamily: 'Poppins, sans-serif', color: '#858585', display: 'flex', flexDirection: userinfo.userName === chatInfo.user.username ? 'row-reverse' : 'row' }} >{userinfo.userName === chatInfo.user.username ? 'Me' : chatInfo.user.username}</span>
              </div>
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default ChatMessages;