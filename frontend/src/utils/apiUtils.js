import apiService from "./apiService"

export const sendMessageAPI = async ({ message, channelId, user }) => {
  try {
    const response = await apiService.post('/message', { message, channelId, user });
    if (response.status === 200) {
      return true;
    }


  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};



export const userStartedTypingAPI = async ({ eventName, channelId, user }) => {
  try {
    const response = await apiService.post('/message/userTyping', { eventName, channelId, user });
    return response;
  } catch (error) {
    console.error('Error sending user typing status:', error);
    return null;
  }
};



export const userStoppedTypingAPI = async ({ eventName, channelId, user }) => {
  try {
    const response = await apiService.post('/message/userStoppedTyping', { eventName, channelId, user });


    return response;
  } catch (error) {
    console.error('Error sending user stopped typing status:', error);
    return null;
  }
};

export const FileUploadApi = async (formData) => {
  try {
    const response = await apiService.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error while uploading file:', error);
    return null;
  }
};










