const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'class_backend',
  password: '00000000',
  port: 5432,
});
// Coba membuat koneksi ke database
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL database');
  client.release();
});


const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://127.0.0.1:5500' }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/users', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users');
    const users = result.rows;
    client.release();
    res.json(users);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ status: "error", message: "internal server error" });
  }
});


app.post('/users', async (req, res) => {
  try {
    const name = req.body.name;
    if (!name) {
      return res.status(400).json({ status: "error", message: "data not provided" });
    }
    
    const client = await pool.connect();
    const result = await client.query('INSERT INTO users (name) VALUES ($1) RETURNING *', [name]);
    const newUser = result.rows[0];
    client.release();
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ status: "error", message: "internal server error" });
  }
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
