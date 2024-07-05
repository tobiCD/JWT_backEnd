import express from 'express'
import {HomePage} from '../controllers/homeController'
import {  handleRegister} from '../controllers/apiController'
const routerApi = express.Router();

const WedAPI = (app)=>{
    routerApi.post('/register', handleRegister)
    return app.use("/api/v1",routerApi)


}
export default WedAPI;