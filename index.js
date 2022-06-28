require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser")
var cors = require('cors')

const mainRouter = require("./Routers/mainRouter")

const errorMiddleware = require("./Middlewares/errorMiddleware")

const PORT = process.env.PORT
const app = express();

app.use(bodyParser.urlencoded({
    extended : true
}))

app.use(cors())

app.use(express.json())
app.use("/api/v1",mainRouter)

app.use(express.static(`${__dirname}/${process.env.LOCAL}`))

app.use(errorMiddleware)

const start = async () =>{
    try{
        app.listen(PORT, ()=> {
            console.log("SERVER STARTED AT PORT : " + PORT)
        });

    }catch(error){
        console.log(error.message)
    }
}
start();
