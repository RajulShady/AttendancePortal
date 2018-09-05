const { addTeacherMethod, deleteTeacherMethod, findTeacher, getTeachersMethod } = require('../teacher/teacher-model');
const { addStudentMethod, deleteStudentMethod, findStudentByRollno, findStudentByClass } = require('../student/student-model');

const addStudent = async (data, res) => {
  try {
    const student = await findStudentByRollno(data.rollno);
    if (student) {
        res.send({ success: false, msg: 'Student already exist' });
    } else {
        await addStudentMethod(data);
        res.send({ success: true, msg: 'Student added successfully' });
    }
  } catch (error) {
    res.send({ success: false, msg: 'Internal Server error'});
  }
};

const deleteStudent = async (data, res) => {
  try{
    const { studentrollno } = data;
    const student = await findStudentByRollno(studentrollno);
    if (!student) {
      res.send({ success: true, msg: 'Student does not exist' });
    } else {
        await deleteStudentMethod(studentrollno);
        res.send({ success: true, msg: 'Student deleted' });
    }
  } catch (error) {
      console.log(error);
      res.send({ success: false, msg: 'INTERNAL SERVER ERROR' });
  }
};

const getStudentByClass = async (data, res) => {
  try{
    const { classname } = data;
    const students =  await findStudentByClass(classname);
    if(students){
      return res.send({ success: true, msg: 'Students list', students });
    } else {
        return res.send({ success: false, msg: 'Students not found' });
    }
    } catch (error) {
      res.send({success: false, msg: 'INETRNAL SERVER ERROR'});
  }
};

const addTeacher = async (data, res) => {
  try {
    const teacher = await findTeacher(data.teacherId);
    if (teacher) {
       return res.send({ success: false, msg: 'Teacher already exists' });
    } else {
        await addTeacherMethod(data);
        res.send({ success: true, msg: 'Teacher added successfully' });
    }
  } catch( error ) {
    res.send({ success: false, msg: 'Internal Server error' });
  }
};

const deleteTeacher = async (data, res) => {
    try {
      const teacher = await findTeacher(data.teacherId);
      if(teacher) {
        await deleteTeacherMethod(data.teacherId);
        return res.send({ success: true, msg: 'Teacher removed successfully' });
      } else {
          return res.send({ success: false, msg: 'Teacher does not found' });
      }
    } catch (error) {
        console.log(error);
        return res.send({ success: false, msg: 'INTERNAL SERVER ERROR'});
    }
};

const getTeachers = async (res) => {
    try {
      const teachers = await getTeachersMethod();
      if(teachers) {
        res.send({ success: true, msg: 'Teachers list', teachers });
      } else {
        res.send({ success: false, msg: 'No teachers found'});
      } 
    } catch (error) {
      console.log(error);
      res.send({ success: false, msg: 'INTERNAL SERVER ERROR' });
    }
};

module.exports = {
    addStudent,
    deleteStudent,
    getStudentByClass,
    addTeacher,
    deleteTeacher,
    getTeachers
};
