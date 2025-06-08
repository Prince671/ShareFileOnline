const express = require('express');
const path = require('path');
const multer = require('multer');
const QRCode = require('qrcode');
const cloudinary = require('./config/cloudinary.config');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', upload.array('uploadedFile'), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files uploaded.');
  }

  try {
    const uploadedFiles = [];

    for (const file of req.files) {
      const cloudResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }).end(file.buffer);
      });

      uploadedFiles.push({
        originalName: file.originalname,
        cloudUrl: cloudResult.secure_url
      });
    }

    // ✅ Join actual cloud URLs for QR data
    const fileLinks = uploadedFiles.map(f => f.cloudUrl).join('\n');

    // ✅ Generate QR code for download links
    const qrCodeUrl = await QRCode.toDataURL(fileLinks);

    // ✅ Render QR code and links page
    res.render('qr', {
      qrCodeUrl,
      links: uploadedFiles
    });

  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).send('Failed to upload files.');
  }
});

app.listen(3000, () => {
  console.log("🚀 Server is running at http://localhost:3000");
});
