const prisma = require ("../db");

const findStudents = async () => {
    const students  = await prisma.students.findMany();

    return students;
}


const findStudentById = async () => {

    const student = await prisma.students.findUnique({
        where: {
          id: parseInt(id),
        },
      });
    

    return student;
}



const insertStudent = async () => {

    const { name, address } = req.body;
  
      await prisma.student.create({
        data: {
          name: name,
          address: address,
        },
      });
    

    return student;
}


const patchhStudent = async () => {
    
    await prisma.student.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name: nama,
          address: address,
        },
      });

    return student;
}


const deleteStudent = async () => {

    await prisma.student.deleteMany({
        where: {
          id: parseInt(id)
        }
      });
    

    return student;
}


module.exports = {
    findStudents,
    findStudentById,
    insertStudent,
    patchhStudent,
    deleteStudent,
}