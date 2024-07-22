import express from 'express'
import initWedRouter from './routes/wed'
import WedAPI from './routes/api'
import ConfigViewEngine from './config/viewEngine'
import DBConnection from './config/DbConfig'
import bodyParser from 'body-parser'
import cors from 'cors'
import ConfigCors from './config/cors'
require('dotenv').config()

const app =express()
const port =  8080
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

DBConnection();
ConfigCors(app)
ConfigViewEngine(app);
initWedRouter(app);
WedAPI(app)
app.listen(port, ()=>{
    console.log(">> BackEnd is running in port",port)

})