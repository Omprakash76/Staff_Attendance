import express from 'express'
import bodyParser from 'body-parser'
import  cors  from 'cors'
import db from "./db"
import router from "./routers"
import * as staffController from "./controllers/staff";

const app = express()
const port = 8001

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, "Mongodb connection error:"))
app.use('/', router)


app.listen(port, ()=>{
  console.log(`server is running on port ${port}`)
})
