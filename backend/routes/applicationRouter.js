import express from 'express'
import { isAuth } from '../middleware/auth.js';
import { employerGetAllApplications, jobseekerDeleteApplication, jobseekerGetAllApplications, postApplication } from '../controller/applicationController.js';

const router = express.Router()

router.post("/post", isAuth, postApplication);
router.get("/employer/getall", isAuth, employerGetAllApplications);
router.get("/jobseeker/getall", isAuth, jobseekerGetAllApplications);
router.delete("/delete/:id", isAuth, jobseekerDeleteApplication);
export default router