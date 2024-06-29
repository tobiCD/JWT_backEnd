import express from 'express'
import initWedRouter from './routes/wed'
import ConfigViewEngine from './config/viewEngine'
import DBConnection from './config/DbConfig'
require('dotenv').config()
const app =express()
const port = process.env.PORT 

DBConnection();
ConfigViewEngine(app);
initWedRouter(app);

app.listen(port, ()=>{
    console.log(">> BackEnd is running in port",port)

})