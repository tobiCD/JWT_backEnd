import express from 'express'
const router = express.Router();


const initWedRouter =(app)=>{
    router.get("/",(req,res)=>{
        return res.send('heellworld')
    })
    return app.use("/",router)
}


export default initWedRouter;