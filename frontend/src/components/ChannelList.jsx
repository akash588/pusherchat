import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChannelList() {
  const [newChannelName, setNewChannelName] = useState('');
  const [errorMessage, setErrorMessage] = useState(null); 
  const navigate = useNavigate();
  
  const handleCreateChannel = () => {
    setErrorMessage(null); 

    if (newChannelName.trim() === '') {
      setErrorMessage('Please enter a channel name');
      return;
    }

    navigate(`/${newChannelName}`);
  };
  console.log("errorMessage",errorMessage);
  return (
    <div>
      <div style={{ marginTop: '20px' }}>
        <h2>Create New Channel</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>} 
        <input
          type="text"
          placeholder="Enter new channel name"
          value={newChannelName}
          onChange={(e) => setNewChannelName(e.target.value)}
        />
        <button style={{ marginTop: '20px' }} onClick={handleCreateChannel} >
          Start Chat
        </button>
      </div>
    </div>
  );
}

export default ChannelList;
