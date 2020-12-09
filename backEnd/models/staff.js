import mongoose, {Schema} from 'mongoose'

const Staff = new Schema(
  {
    name : { type : String, required : true },
    mobile : { type : Number, required : true }
  },
  { timeStamps : true}
  )

export default mongoose.model('staff', Staff)
