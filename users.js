const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan('combined'));

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

app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "resource tidak ditemukan",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "terjadi kesalahan pada server",
  });
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:name', (req, res) => {
  const userName = req.params.name.toLowerCase();
  const user = users.find(u => u.name.toLowerCase() === userName);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      status: "error",
      message: "user tidak ditemukan",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
