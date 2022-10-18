const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors')
const { readdirSync } = require("fs");


const app = express()


app.use(express.json())
app.use(express.static('public'))
app.use(helmet())
app.use(express.urlencoded( {extended : false} ))
app.use(morgan('dev'))
app.use(cors())


//<----------Database connection ---------->

mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB Error =>" , err))



// <------------Routers Middlewares-------->

readdirSync("./routes").map(r => app.use("/api/v1", require(`./routes/${r}`)));

const PORT = process.env.PORT
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
})

