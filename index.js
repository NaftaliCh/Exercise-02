
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const database = require("./db");

const express = require('express');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const upload = multer({ dest: "public"});
const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Get students
app.get("/students", async (req, res) => {
  try {
    // const result = await database.query("SELECT * FROM students");
    const allStudent = await prisma.students.findMany();
    console.log(allStudent);
    res.status(200).json({
      status: "success",
      data: allStudent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//Post Student
app.post("/students", async (req, res) => {
  try {
    const { name, address } = req.body;

    await prisma.students.create({
      data: {
        name: name,
        address: address,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Data berhasil dimasukkan",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


// Get student by ID Prisma
app.get("/students/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const student = await prisma.students.findUnique({
      where: {
        id: parsenInt(id),
      },
    });

    if (!student) {
      res.status(404).json({
        status: "error",
        data: "Data mahasiswa tidak ditemukan",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: student,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Update Student by ID Prisma
app.patch("/students/:id", async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;
  try {
    await prisma.students.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
        address: address,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Data berhasil diupdate",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Delete Student by ID Prisma
app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.students.deleteMany({
      where: {
        id: parseInt(id)
      }
    });

    res.status(200).json({
      status: "success",
      message: "Data berhasil dihapus",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}`);
  });