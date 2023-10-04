import mongoose from "mongoose";
import StudentModel from "../../database/student.js";
import AccountRepository from "../../repositories/account.js";
import { STUDENT_ROLE } from "../../utils/constant.js";
import logger from "../../utils/logger.js";
import AccountModel from "../../database/account.js";
import crypt from "../../utils/crypt.js";

const getAllStudents = async () => {
  let students = await AccountRepository.find({ role: STUDENT_ROLE });
  students = students.map((student) => {
    delete student.password;
    return student;
  });
  logger.info(
    `Get all students successfully - ${
      students.length
    } students - ${JSON.stringify(students)}`
  );
  return students;
};

const addStudent = async (student, createdBy) => {
  const existedStudent = await AccountModel.findOne({
    username: student.username,
  });
  if (existedStudent) {
    throw new CustomException(400, "Username existed", EXISTED_ERROR_CODE);
  }
  const newStudent = await StudentModel.create({
    ...student,
    createdBy: new mongoose.Types.ObjectId(createdBy),
  });

  const newAccount = await AccountModel.create({
    ...student,
    role: STUDENT_ROLE,
    student: newStudent._id,
    password: crypt.bcryptHash(student.password),
  });
  delete newAccount.password;
  logger.info(`Add student successfully - ${JSON.stringify(newStudent)}`);
  return newAccount;
};

const updateStudent = async (id, student) => {
  const updatedStudent = await StudentModel.findByIdAndUpdate(id, student, {
    new: true,
  });
  delete updatedStudent.password;
  logger.info(
    `Update student successfully - ${JSON.stringify(updatedStudent)}`
  );
  return updatedStudent;
};

export default { getAllStudents, addStudent, updateStudent };
