const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware untuk request body menggunakan body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware untuk file static
app.use(express.static('public'));

// Middleware untuk file upload menggunakan multer
const upload = multer({ dest: 'uploads/' });
app.post('/api/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    // Lakukan sesuatu dengan file yang diunggah
    res.json({ message: 'File diunggah!', file });
});

// Middleware untuk penanganan CORS
app.use(cors());

// Contoh route untuk menangani request POST dengan body
app.post('/api/data', (req, res) => {
    const data = req.body;
    // Lakukan sesuatu dengan data
    res.json({ message: 'Data diterima!', data });
});

// Contoh route untuk akses file statis
app.get('/static-file', (req, res) => {
    res.sendFile(__dirname + '/public/static-file.html');
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
