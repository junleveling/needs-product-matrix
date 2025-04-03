
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.static('uploads')); // 提供靜態下載支援

app.post('/upload/:type', upload.single('file'), (req, res) => {
  const type = req.params.type;
  const targetPath = path.join(__dirname, 'uploads', `${type}.json`);
  fs.rename(req.file.path, targetPath, (err) => {
    if (err) return res.status(500).send('Error saving file.');
    res.send({ message: 'Upload successful', path: `/uploads/${type}.json` });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
