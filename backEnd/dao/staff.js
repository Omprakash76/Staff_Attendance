import Staff from "../models/staff"
import StaffAttendance from "../models/staff_attendance";
import moment from "moment";

async function createNewStaff(data){
  const staff = new Staff(data)
  await staff.save()
}

async function getAllStaffs(){
  const data = await Staff.find();
  console.log(`.>>>>>>>>>>>>>>>>>>>>>data`, data)
  return data
}

async function deleteStaff(data){
  await Staff.deleteOne({_id : data._id})
}

export {
  createNewStaff,
  getAllStaffs,
  deleteStaff
}
