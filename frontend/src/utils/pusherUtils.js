
import Pusher from 'pusher-js';
export const createPusher = () => {
  return new Pusher('7d48e24cb34598cbf60c', {
    cluster: 'ap2',
    forceTLS: true,
    authEndpoint: 'http://localhost:3001/pusher/auth'
  });
};

export const subscribeToChannel = (pusher, channelName) => {
  const channel = pusher.subscribe(`private-${channelName}`);
  console.log("channel", channel);
  return channel;
};

export const handleMessageEvent = (channel, setChatLog) => {
  channel.bind('message', (data) => {
    console.log("datamessage", data);
    setChatLog((prevChatLog) => [...prevChatLog, data]);
  });
  return () => {
    channel.unbind('message');
  };
};

export const handleUserTypingEvent = (channel, setUserTyping, userinfo) => {
  channel.bind('userTyping', (data) => {
    console.log("userTyping", data, userinfo);
    if (data.id !== userinfo.id) {
      setUserTyping(data);
    }
  });
  return () => {
    channel.unbind('userTyping');
  };
};

export const handleUserStoppedTypingEvent = (channel, setUserTyping) => {
  channel.bind('userStoppedTyping', () => {
    setUserTyping([]);
  });
  return () => {
    channel.unbind('userStoppedTyping'); // Return a cleanup function
  };
};

export const handleScrollToEnd = (chatEndRef) => {
  if (chatEndRef.current) {
    chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }
};
