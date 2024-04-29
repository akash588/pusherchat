const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'chat-9653b.appspot.com',
});

const bucket = admin.storage().bucket();

router.post('/', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const uploadedFile = req.files.file;
  const fileName = uploadedFile.name;


  const encodedFileName = encodeURIComponent(fileName);

  const file = bucket.file(encodedFileName);

  try {
    await file.save(uploadedFile.data);


    await file.makePublic();


    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${encodedFileName}`;

    return res.json({ publicUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: 'Error uploading file', details: error.message });
  }
});

module.exports = router;
