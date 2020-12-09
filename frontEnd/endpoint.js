const api = 'http://192.168.0.83:8001';

export const CREATE_STAFF = `${api}/v0.1/staff/create_staff`;

export const GET_ALL_STAFF = `${api}/v0.1/staff/:attendance_date/get/all_staffs/with_attendance`;

export const CREATE_STAFF_ATTENDANCE_STATUS = `${api}/v0.1/staff/create/attendance`;

export const UPDATE_STAFF_ATTENDANCE_STATUS = `${api}/v0.1/staff/update/attendance`;
