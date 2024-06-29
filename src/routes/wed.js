import express from 'express'
import {HomePage} from '../controllers/homeController'
const router = express.Router();


const initWedRouter =(app)=>{
    router.get('/home',HomePage )
    return app.use("/",router)
}


export default initWedRouter;