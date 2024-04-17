const prisma = require ("../db");

const {

    findStudents,
    findStudentById,
    insertStudent,
    patchhStudent,
    deleteStudent,
  
} = require("./student.repository");

const getAllstudents = async () => {
    const students = await findStudents();

    return students;
};
const getStudentById = async () => {

   
      const student = await findStudentById ();
  
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
   

    return student;
}

const createStudentById = async () => {

    const student = await insertStudent ();
  
      res.status(200).json({
        status: "success",
        message: "Data berhasil dimasukkan",
      });

      return  student;
}

const patchStudentById = async () => {

    const student = await patchhStudent ();
  
      res.status(200).json({
        status: "success",
        message: "Data berhasil diupdate",
      });
    
      return student;
}

const deleteStudentbById = async () => {

   const student = deleteStudent ();
  
      res.status(200).json({
        status: "success",
        message: "Data berhasil dihapus",
      });

      return student;

}

module.exports = {
    getAllstudents,
    getStudentById,
    createStudentById,
    patchStudentById,
    deleteStudentbById,
};