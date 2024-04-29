const express = require('express');
const router = express.Router();
require('dotenv').config();
const Pusher = require('pusher');

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: process.env.PUSHER_USE_TLS === 'true', // Convert the string 'true' to a boolean
});

router.post('/login', (req, res) => {
  const { userInfo, socketId } = req.body;

  userInfo.id = id
  const auth = pusher.authenticateUser(socketId, userInfo);
  console.log("auth", auth);
  res.send(auth);
});



router.post('/pusher/auth', (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const auth = pusher.authorizeChannel(socketId, channel, {
    // Add authentication logic for private channels
  });
  res.send(auth);
});


module.exports = router;
