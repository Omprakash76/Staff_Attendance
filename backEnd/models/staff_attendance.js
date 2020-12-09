import mongoose,{Schema} from 'mongoose'

const staffAttendance = new Schema(
  {
    staff_id : { type : String, required : true },
    attendance_date : { type : Date, required: true } ,
    attendance_status : { type : String, required : true }
  },
  { timeStamps : true}
  )

export default mongoose.model('staff_attendance', staffAttendance)
