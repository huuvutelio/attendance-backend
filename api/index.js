import { Router } from "express";

import authRouter from "./auths/index.js";
import faceRecognitionRouter from "./faceRecognition/index.js";
import fileRouter from "./files/index.js";
import teacherRouter from "./teachers/index.js";
import classroomRouter from "./classrooms/index.js";
import subjectRouter from "./subjects/index.js";
import studentRouter from "./students/index.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/files", fileRouter);
router.use("/face-recognition", faceRecognitionRouter);
router.use("/teachers", teacherRouter);
router.use("/classrooms", classroomRouter);
router.use("/subjects", subjectRouter);
router.use("/students", studentRouter);

export default router;
