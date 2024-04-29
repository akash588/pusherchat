import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { sendMessageAPI, userStartedTypingAPI, userStoppedTypingAPI,FileUploadApi } from "../utils/apiUtils";
import Pusher from 'pusher-js';
import {
  subscribeToChannel,
  handleMessageEvent,
  handleUserTypingEvent,
  handleUserStoppedTypingEvent,
  handleScrollToEnd,
} from '../utils/pusherUtils'
import MessageInput from "../components/MessageInput/MessageInput"
import ChatMessages from "../components/ChatMessages/ChatMessages"
import UserTypingStatus from "../components/UserTypingStatus/UserTypingStatus"
const Card = (props) => {

  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [userTyping, setUserTyping] = useState([])
  const [canPublish, setcanPublish] = useState(true)
  const [file, setFile] = useState(null);
  const [base64File, setBase64File] = useState('')
  const [loading, setLoading] = useState(false);
  const [fileLoading, setfileLoading] = useState(false);
  const chatEndRef = useRef(null);
  const location = useLocation()
  const { userinfo } = props

  let channelName = location.pathname.replace(/\//g, "");


  useEffect(() => {

    const pusher = new Pusher('7d48e24cb34598cbf60c', {
      cluster: 'ap2',
      forceTLS: true,
      authEndpoint: 'http://localhost:3001/auth/pusher/auth'
    });

    const channel = subscribeToChannel(pusher, channelName);

    const handleMessageCleanup = handleMessageEvent(channel, setChatLog); // Store cleanup functions
    const handleUserTypingCleanup = handleUserTypingEvent(channel, setUserTyping, userinfo);
    const handleUserStoppedTypingCleanup = handleUserStoppedTypingEvent(channel, setUserTyping);
    handleScrollToEnd(chatEndRef);

    return () => {
      handleMessageCleanup();
      handleUserTypingCleanup();
      handleUserStoppedTypingCleanup();
      pusher.unsubscribe(channelName);
    };
  }, []);
  const handleUpload = async () => {
    setLoading(true)
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await FileUploadApi(formData);
   
if(response){

      const { publicUrl } = response;
      console.log('Uploaded File:', publicUrl);
      if (publicUrl) setBase64File(publicUrl)
      setLoading(false)
}
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


  const handleFileChange = (e) => {
    setBase64File('')
    setFile(e.target.files[0]);
  };



  const sendMessage = async () => {
    try {
      let data = await sendMessageAPI({ message, channelId: `private-${channelName}`, user: userinfo });
      if (data) {
        console.log("datadatadatadataddd", data);
        setMessage('');
      }

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const submitFile = async () => {
    try {
      setfileLoading(true)
      let data = await sendMessageAPI({ message: base64File, channelId: `private-${channelName}`, user: userinfo });
      if (data) {
        console.log("suubb", data);
        setfileLoading(false)
        setMessage('');
      }

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  const handleKeyUp = async (e) => {
    console.log("hi", canPublish);
    if (canPublish) {
      setcanPublish(false);

      try {
        await userStartedTypingAPI({
          eventName: "userTyping",
          channelId: `private-${channelName}`,
          user: userinfo
        });

        setTimeout(async function () {
          setcanPublish(true);

          await userStoppedTypingAPI({
            eventName: "userStoppedTyping",
            channelId: `private-${channelName}`,
            user: userinfo
          });

        }, 2000);
      } catch (error) {
        console.error('Error handling user typing:', error);
      }
    }
  };
  console.log("setMessagess", message);

  return (
    <div className='main-container'>

      <div

        className='inner-container'
      >
        <ChatMessages chatLog={chatLog} userinfo={userinfo} />
        {userTyping?.id && <UserTypingStatus userinfo={userinfo} userTyping={userTyping} />}



      </div>

      <div style={{ flex: '3', display: 'flex', flexDirection: 'column', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', marginLeft: '10px' }}>
        <MessageInput message={message} setMessage={setMessage} handleKeyUp={handleKeyUp} sendMessage={sendMessage} />
        <div>
          <input type="file" onChange={handleFileChange} style={{marginBottom: '10px'}} />

    
  
        <div>
          {base64File === '' ? (
            <button disabled={loading} onClick={handleUpload}> {loading ? "Loading.." : "Upload file"}</button>
          ) : (
            <button disabled={fileLoading} onClick={submitFile}> {fileLoading ? "Loading.." : "Send"}</button>
          )}
        </div>
     



        </div>
      </div>


    </div>
  );
};

export default Card;
