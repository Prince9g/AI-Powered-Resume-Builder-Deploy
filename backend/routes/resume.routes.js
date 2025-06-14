import express from 'express';
import { isAuth } from '../middlewares/auth.js';
import { createResume, deleteResume,getUserResumes, updateResume } from '../controller/resume.controller.js';

const router = express.Router();

router.post("/", isAuth, createResume); // Create resume
router.get("/user-resumes", isAuth, getUserResumes); // Get user resume
router.put("/", isAuth, updateResume); // Update resume
router.delete("/", isAuth, deleteResume); // Delete resume

export default router;
