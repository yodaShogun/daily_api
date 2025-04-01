const express  = require("express")
const env  = require("dotenv")
const morgan = require("morgan")
const body = require("body-parser")
const cors = require("cors")
const init = require("./config/init")


//REST OBJECT
const SERVER = express()

//dotenv config
env.config()

//middlewares
SERVER.use(cors())
SERVER.use(express.json())
SERVER.use(express.static('public'));
SERVER.use(morgan('dev'))
SERVER.use(body.urlencoded({ extended: true }))
SERVER.use(body.json())

init.query('SELECT 1').then(()=>{   
    SERVER.listen(process.env.PORT, '0.0.0.0', ()=>{
        console.log(`Running on port: ${process.env.PORT}`)
    })
}).catch((error)=>{
    console.log(error)
}) 

//client
SERVER.use("/api/v1/client/guy-delight/category/",require("./routes/client/groupRoutes"))
SERVER.use("/api/v1/client/guy-delight/menu",require("./routes/client/itemRoutes"))

//admin
SERVER.use("/api/v1/admin/guy-delight/auth", require("./routes/admin/authRoutes"))
SERVER.use("/api/v1/admin/guy-delight/group",require("./routes/admin/adminGroupRoutes"))
SERVER.use("/api/v1/admin/guy-delight/menu",require("./routes/admin/adminItemRoutes"))

