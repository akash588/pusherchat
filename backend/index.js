// index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(fileUpload());
const port = process.env.PORT || 3001;
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const uploadRoutes = require('./routes/uploadRoutes');


app.use('/auth', authRoutes);
app.use('/message', messageRoutes);
app.use('/upload', uploadRoutes);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});