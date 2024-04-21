import express from 'express'
import { deleteJob, getJob, getMyJob, getSingleJob, postjob, updatejob } from '../controller/jobController.js'
import { isAuth } from '../middleware/auth.js'

const router = express.Router()


router.get('/getjobs', getJob)
router.post('/postjob', isAuth, postjob)
router.get('/getmyjobs', isAuth, getMyJob)
router.put('/updatejob/:id', isAuth, updatejob)
router.delete('/deletejob/:id', isAuth, deleteJob)
router.get('/getsinglejob/:id', isAuth, getSingleJob)
export default router