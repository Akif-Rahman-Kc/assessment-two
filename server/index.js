const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();
const mysql = require('mysql')

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123"
})

con.connect(function(err){
    if (err) {
        console.log(err);
    } else {
        console.log('Connected');
    }
})

const userRouter = require('./routes/user')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/public',express.static('public'))

app.use('/', userRouter)

app.listen(4000)