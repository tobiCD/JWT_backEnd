import express from 'express'
import path from 'path'

const ConfigViewEngine =(app)=>{
    app.use('/static',  express.static('./src/public'));
    app.set("view engine","ejs");
    app.set("views","./src/views");
}

export default ConfigViewEngine;
