const express = require('express');
const router = express.Router();
require('dotenv').config();
const { formatDate } = require('../helper/helper');
const profaneWords = require("../helper/profanewords.json");
const Pusher = require('pusher');

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: process.env.PUSHER_USE_TLS === 'true', // Convert the string 'true' to a boolean
});

router.post('/', async (req, res) => {
  try {
    const { message, channelId, user } = req.body;
    if(!user) return res.status(400).send("user not found");
    const formattedDate = formatDate(new Date());

    let censoredMessage = message;
    
    if (!message.includes("https://")) {
    for (const word of profaneWords) {
      const regex = new RegExp(word, 'gi');
      censoredMessage = censoredMessage.replace(regex, '***');
    }
  }
  
    let resp = await pusher.trigger(channelId, 'message', {
      message : censoredMessage,
      user: {
        id: user.id,
        username: user.userName,
        avatar: 'https://example.com/avatar.jpg',
      },
      timestamp: formattedDate,
    });

    

    return res.sendStatus(200);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Internal Server Error");
  }
});


router.post('/userTyping', function (req, res) {

  const { eventName, channelId, user } = req.body
  console.log("userTyping", req.body);
  // const username = req.body.username;
  pusher.trigger(channelId, eventName, user);
  return res.status(200).send();

})
router.post('/userStoppedTyping', function (req, res) {

  const { eventName, channelId, user } = req.body
  console.log("userStoppedTyping", eventName);
  // const username = req.body.username;
  pusher.trigger(channelId, eventName, user);
  return res.status(200).send();

})

// Export the router
module.exports = router;
