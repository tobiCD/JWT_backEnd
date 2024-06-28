import express from 'express'
import initWedRouter from './routes/wed'
import ConfigViewEngine from './configs/viewEngine'
require('dotenv').config()
const app =express()
const port = process.env.PORT 


ConfigViewEngine(app);
initWedRouter(app);

app.listen(port, ()=>{
    console.log(">> BackEnd is running in port",port)

})