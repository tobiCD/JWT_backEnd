import { raw } from 'body-parser'
import db from '../models/index'


const getAllUser =async()=>{
   
    try {
        let users = await db.User.findAll({
             attributes:["id","username","email"],
             include : {model: db.Group ,  attributes:["name","description"]},
             nest : true

        })
        if(users){
            console.log('check >> user:',users)
            // let data = users.get({p lain : true})
            return {
                EM:'Get data success',
                EC :0,
                DT :users
            }
         }else{
            return{
                EM:'get data success',
                EC :0,
                DT :[],
            }
         }

    } catch (error) {
        console.log(error)
        return{
            EM:'get data fail',
            EC :1,
            DT :[],
        }
    }
}
const CreateUser = async(data)=>{
    try {
        await db.User.create({
 
        })
    } catch (error) {
        
    }
}
const UpdateUser =async(data)=>{
    try {
        let user = await db.User.findOne({
            where :{ id : data.id}
        })
        if(user){
         await user.update({
            
         })
        }
    } catch (error) {
        console.log(error)
    }
}
const deleteUser = async(Userid)=>{
    try {
       await db.User.findOne({
        where :{
            id : Userid 
        }
       })
    } catch (error) {
       console.log(error) 
    }
}
const getUserWithPanigation = async(page,limit)=>{
    try {
        const offset = (page -1)* limit
        const {count , rows} = await db.User.findAndCountAll({
            offset : offset, 
            limit : parseInt(limit),
            raw  : true
            
        })
        let totalPages = Math.ceil(count/limit)
        let data ={
            totalRows : count,
            totalPages : totalPages,
            users : rows
        }
        console.log(">>> check Data : ", data)
        return{
            EM:'ok',
            EC :0,
            DT :data,
    }
    } catch (error) {
        console.log(error)
        return{
            EM:'something wrongs with server',
            EC :1,
            DT :[],
    }
}
}
module.exports ={getAllUser,CreateUser , UpdateUser ,deleteUser,getUserWithPanigation}