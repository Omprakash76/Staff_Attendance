import * as StaffDao from "../dao/staff";
import * as StaffAttendanceDao from "../dao/staff_attendance";
import {groupBy, isEmpty, unionBy} from 'lodash'
import moment from 'moment';
const createNewStaff = async (req, res)=>{
  const data = req.body
  console.log(`......................createNewStaff  data`, data)
  await StaffDao.createNewStaff(data)
  res.send({status : 'success'})
}

const deleteStaff = async (req, res)=>{
  const data = req.body
  console.log(`......................deleteStaff  data`, data)
  await StaffDao.deleteStaff(data)
  res.send({status : 'success'})
}

const getAllStaffsWithAttendance = async (req, res)=>{
  const date = req.params.attendance_date
  console.log(`......................getAllStaffs date  `, date)
  const staffDetails = await StaffDao.getAllStaffs()
  let attendanceDetails = await StaffAttendanceDao.getStaffAttendanceByDate(date)
  const groupByAttendanceDetails = groupBy(unionBy(attendanceDetails, 'staff_id'), 'staff_id')
  console.log(`......................attendanceDetails attendanceDetails  `, JSON.stringify(attendanceDetails))
  console.log(`......................attendanceDetails groupByAttendanceDetails  `, JSON.stringify(groupByAttendanceDetails))

  let data = []
  if(!isEmpty(staffDetails)){
    for(let staff of staffDetails){
      const attendancedDta = groupByAttendanceDetails[staff._id] || []
      data.attendance = attendancedDta
      data.push({_id : staff._id,name : staff.name, mobile: staff.mobile, attendance : attendancedDta })
    }
  }
  console.log(`......................getAllStaffs data  `, JSON.stringify(data))

  res.send(data)
}
const saveStaffAttendance = async (req, res)=>{
  const data = req.body
  console.log(`......................saveStaffAttendance    data`, data)
  await StaffAttendanceDao.saveStaffNewAttendance(data)
  res.send({status : 'success'})

}

const updateStaffAttendance = async (req, res)=>{
  const data = req.body
  console.log(`......................updateStaffAttendance    data`, data)

  await StaffAttendanceDao.updateStaffAttendanceStatus(data)
  res.send({status : 'success'})
}

const deleteAttendance = async (req, res)=>{
  const data = req.body
  console.log(`......................deleteAttendance    data`, data)
  await StaffAttendanceDao.deleteAttendance(data)
  res.send({status : 'success'})

}

export {
  createNewStaff,
  getAllStaffsWithAttendance,
  saveStaffAttendance,
  updateStaffAttendance,
  deleteAttendance,
  deleteStaff
}
