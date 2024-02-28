const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://127.0.0.1:5500' }));
app.use(express.static(path.join(__dirname, 'public')));


const users = [
 {
   id: 1,
   name: "John",
 },
 {
   id: 2,
   name: "Smith",
 },
 {
   id: 3,
   name: "Bob",
 },
];


app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:name', (req, res) => {
  const name = req.params.name.toLowerCase();
  const user = users.find(u => u.name.toLowerCase() === name);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ status: "error", message: "resource not found" });
  }
});

app.post('/users', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ status: "error", message: "data not provided" });
  }
  
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

const upload = multer({ dest: 'public/' });

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ status: 'success', message: 'file uploaded successfully' });
});

app.put('/users/:name', (req, res) => {
  const name = req.params.name.toLowerCase();
  const userIndex = users.findIndex(u => u.name.toLowerCase() === name);
  if (userIndex === -1) {
    return res.status(404).json({ status: "error", message: "resource not found" });
  }
  
  if (!req.body.name) {
    return res.status(400).json({ status: "error", message: "data not provided" });
  }
  
  users[userIndex].name = req.body.name;
  res.json({ status: "success", message: "user updated successfully" });
});

app.delete('/users/:name', (req, res) => {
  const name = req.params.name.toLowerCase();
  const userIndex = users.findIndex(u => u.name.toLowerCase() === name);
  if (userIndex === -1) {
    return res.status(404).json({ status: "error", message: "resource not found" });
  }
  
  users.splice(userIndex, 1);
  res.json({ status: "success", message: "user deleted successfully" });
});


app.use((req, res, next) => {
  res.status(404).json({ status: "error", message: "resource not found" });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: "error", message: "internal server error" });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});