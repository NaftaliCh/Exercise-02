
const express = require('express');
const prisma = require("../db");
const { getAllstudents, createStudentById, patchStudentById, deleteStudentbById } = require ('./student.service');

const {
    getAllstudents,
    getStudentById,
    createStudentById,
    patchStudentById,
    deleteStudentbById,
  } = require("./student.service");


const router = express.Router();


router.get("/", async (req, res) => {
  
    const students = getAllstudents;

    res.send(students);
  });
  
router.get("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
   
    const student = getStudentById();

} catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
  });
 
router.post("/:id", async (req, res) => {
    try {

         const student = createStudentById();

    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });
  
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, address } = req.body;
    try {

        const student = patchStudentById ();
      
        
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });
  
 
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {

        const student = deleteStudentbById ();
      
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });

  module.exports = router;