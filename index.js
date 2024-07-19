const express = require("express")
const cookieParser = require('cookie-parser')
const cors=require("cors")
require('dotenv').config()
const connectDB=require('./config/db.js')
const app = express()
const bodyParser = require('body-parser');
const router=require("./routes")
app.use(cors(
   { origin:process.env.FRONTEND_URL,
    credentials:true
   }
))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser())
app.use(express.json())

app.use("/api",router)
const PORT=8080 || process.env.PORT
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("server started",PORT)
    })
})
//updated new file
