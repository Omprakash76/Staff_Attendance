import mongoose from 'mongoose'

const uri = 'mongodb://127.0.0.1:27017/sumedha'
mongoose.connect(uri, {useNewUrlParser : true})
  .catch(e=>{
    console.log('error in db connect', e.message)
  })

const db = mongoose.connection

export default db
