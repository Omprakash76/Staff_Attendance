/* eslint-disable prettier/prettier */
import * as endPoint from "./endpoint"
import { callAPI } from "./generic";
import {POST, GET} from "./constants"
async function createNewStaff(data){
  console.log(`.>>>>>>>>>>>>>>>>>>>>>>createNewStaff. data`, data)
  await callAPI(endPoint.CREATE_STAFF, POST, data)
}

async function getALlStaffs(date){
  return await callAPI(endPoint.GET_ALL_STAFF.replace(':attendance_date',date), GET);
}

async function createStaffAttendance(data){
  const url = endPoint.CREATE_STAFF_ATTENDANCE_STATUS
  await callAPI(url, POST, data);
}

async function updateStaffLeaveStatus(data){
  const url = endPoint.UPDATE_STAFF_ATTENDANCE_STATUS
  await callAPI(url, POST, data);
}

export {
  createNewStaff,
  getALlStaffs,
  createStaffAttendance,
  updateStaffLeaveStatus
}
