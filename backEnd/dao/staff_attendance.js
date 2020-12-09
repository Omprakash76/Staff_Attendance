import StaffAttendance from "../models/staff_attendance"
import moment from "moment";
async function saveStaffNewAttendance(data){
  const data0 = await StaffAttendance.deleteOne({staff_id : data.staff_id, attendance_date : moment.utc(data.attendance_date)})
  console.log('data0', data0)
  const attendance = new StaffAttendance(data)
  const data1 =  await attendance.save()
  console.log('data1', data1)
  return data1

}


async function updateStaffAttendanceStatus(data){
  return await StaffAttendance.findOneAndUpdate({_id : data._id, attendance_date : data.attendance_date}, {attendance_status : data.attendance_status})
}

async function getStaffAttendanceByDate(date){
  console.log(`.>>>>>>>>>>>>>>>>>>>>>>>>>.date`, date)
  date = moment.utc(date)
  console.log(`.>>>>>>>>>>>>>>>>>>>>>>>>>.date utc`, date)

  const data =  await StaffAttendance.find({attendance_date : date})
  console.log(`.>>>>>>>>>>>>>>>>>>>>>>>>>.data`, data)
  return data
}

async function deleteAttendance(data){
  await StaffAttendance.deleteOne({staff_id : data.staff_id, attendance_date : moment.utc(data.attendance_date)})
}

export {
  saveStaffNewAttendance,
  updateStaffAttendanceStatus,
  getStaffAttendanceByDate,
  deleteAttendance
}
