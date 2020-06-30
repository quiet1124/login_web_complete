var express = require('express')
var app = express()
require('dotenv').config()
// require와 module.exports, import와 export는 서로 짝을 이룬다.
var path = require('path')
require('ejs')
var apiRouter = require('./routes/Router')
const mongoose = require('mongoose');

var pw = process.env.PASSWORD
var url = `mongodb+srv://root:${pw}@cluster0.8xisq.mongodb.net/mydb?retryWrites=true&w=majority`
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true} )

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

app.set('views', path.resolve(__dirname + '/views'))
app.set('view engine', 'ejs')
//routing 파일 미들웨어로 등록
app.use('/', apiRouter)

// port 처리를 위해서 dotenv를 이용해서 .env 등록해서 관리한다.
const port = process.env.PORT
app.listen(port, function(){
    console.log(`Server is starting at http://localhost:${port}`)
})