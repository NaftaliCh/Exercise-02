
const express = require("express");
const morgan = require("morgan");

const app = express();
const port = 3000;

app.use(express.json());

const studentController = require("./student/student.controller");

app.use ("/students", studentController);


app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});
