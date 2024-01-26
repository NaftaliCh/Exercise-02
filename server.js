const express = require('express');
const app = express();
const members = require('./members');
const users = require('./users');

app.get('/', (req, res) => {
  res.send('This is the home page');
});

app.get('/about', (req, res) => {
  const currentDate = new Date().toISOString();
  const responseData = {
    Status: 'success',
    Message: 'response success',
    Description: 'Exercise #02',
    Date: currentDate,
    Data: members.getMembers(),
  };
  res.json(responseData);
});

app.get('/users', async (req, res) => {
  try {
    const usersData = await users.getUsers();
    res.json(usersData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));