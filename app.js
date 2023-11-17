const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const routes = require('./routes/route')
const cors = require("cors");
const app = express()

// const __dirname = path.resolve()

app.use(express.json())
// const corsOptions = {
//     origin: 'http://localhost:3000',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // Include cookies and authentication headers
//   };

app.use(cors());
app.use(cookieParser())

app.use('/api/v1',routes)
app.use(express.static(path.join(__dirname, "./client/build")))
app.get('*', function(_,res){
  res.sendFile(path.join(__dirname, "./client/build/index.html"), function(err){
    res.status(500).send(err)
  })
})



module.exports = app