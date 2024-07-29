import express from 'express'
import {HomePage} from '../controllers/homeController'
import {handleRegister, HandleLogin,HandleCreate} from '../controllers/apiController'
import {checkUserjwt,checkUserPermission} from '../middleware/JWTAction'
const userController = require('../controllers/userController')
const routerApi = express.Router();



const WedAPI = (app)=>{
    routerApi.all('*', checkUserjwt,checkUserPermission)
    routerApi.post('/register', handleRegister)
    routerApi.post('/login' ,HandleLogin )
    routerApi.get('/user/read',checkUserjwt, userController.ReadUser)
    routerApi.post('/user/create', HandleCreate)

    // routerApi.get('/user/read/page=?&limit=?', userController.ReadUser)
    routerApi.delete('/user/delete/:id', userController.deleteUser)
    routerApi.put('/user/edit',userController.updateUser)
    routerApi.get('/account',userController.getUserAccount)
        //Group call
    routerApi.get('/group/read', userController.ReadGroup)

    // routerApi.post('user/create', createUser)
    // routerApi.put('user/update',updateUser)
    // routerApi.delete('user/delete', deleteUser)

    return app.use("/api/v1",routerApi)


}
export default WedAPI;