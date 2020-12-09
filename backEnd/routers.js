import express  from 'express';
import * as staffController from "./controllers/staff"
const router = express.Router()

// create new staff
router.post('/v0.1/staff/create_staff', staffController.createNewStaff)

// get all staffs
router.get('/v0.1/staff/:attendance_date/get/all_staffs/with_attendance', staffController.getAllStaffsWithAttendance)

//create attendance status
router.post('/v0.1/staff/create/attendance', staffController.saveStaffAttendance)

//update attendance status
router.post('/v0.1/staff/update/attendance', staffController.updateStaffAttendance)

//delete attendance
router.post('/v0.1/staff/delete/attendance', staffController.deleteAttendance)

//delete attendance
router.post('/v0.1/staff/delete/staff', staffController.deleteStaff)

export default router
