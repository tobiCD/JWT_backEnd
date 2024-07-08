import express from 'express'
import {HomePage} from '../controllers/homeController'
import {handleRegister, HandleLogin} from '../controllers/apiController'

const routerApi = express.Router();

const WedAPI = (app)=>{
    routerApi.post('/register', handleRegister)
    routerApi.post('/login' ,HandleLogin )
    return app.use("/api/v1",routerApi)


}
export default WedAPI;