import { where } from 'sequelize'
import db from '../models/index'
import bcrypt  from 'bcrypt'
require('dotenv').config()
import {Op} from 'sequelize';
import {getGroupWithRole} from './jwtService'
import {createJWT} from '../middleware/JWTAction'
const salt = bcrypt.genSaltSync(10);
const hashPassword = (userPassword )=>{ // xử lí hashPassword cho register
    const hash = bcrypt.hashSync(userPassword, salt);
    return hash;

}
const UnHassPassword = (inputPassword,hashPassword)=>{
    return bcrypt.compareSync(inputPassword,hashPassword)
}

const isEmail =async (useremail)=>{
    const userEmail = await db.User.findOne({
        where : { email : useremail } 
    })
    if(userEmail) {
        return true;
       
    }
        return false;
    
}
const isPhone =async (userphone)=>{
    const userPhone = await db.User.findOne({
        where : { phoneNumber : userphone }
    })
    if(userPhone) {
        return true;
       
    }
        return false;
    
}
const isPassword = async(Password)=>{
    const unHashPassword = bcrypt.compareSync(Password, hashPassword(Password))
    const password =  await db.User.findOne({
        where:{ password : unHashPassword }
    })
    
    if(password ){
        return true;
       
    }
        return false;
}


const RegisterService = async(rawUserData)=>{ // function nhận dữ liệu request chọc xuống database 
   try {
        const CheckEmail = await isEmail(rawUserData.email) // xử lí check email valid
        console.log(CheckEmail)
        if (CheckEmail === true ){
        return {
            EM : 'The Email is exist',
            EC : 400
        }
        }  
        const CheckPhone =await isPhone(rawUserData.phone) // xử lí check phone valid
        console.log(CheckPhone)

        if (CheckPhone === true ){
        return {
            EM : 'The Phone Number is exist',
            EC : 400
        }
    }
    const PasswordHashed = hashPassword(rawUserData.password)
    // let token = 
    await db.User.create({
       email : rawUserData.email , 
       username : rawUserData.username,
       password  : PasswordHashed,
       phoneNumber  : rawUserData.phone,
       groupId : 1

    })
    return {
        EM : "A user is created successfully !",
        EC :  200
    }
    }
    catch(error) {
        console.log(error)
        return {
            EM : "Somethings wrong in service",
            EC : 500
        }
    }

}
const LoginService = async(rawUserData)=>{
  try {
   let user = await db.User.findOne({
    where: {
        [Op.or]:[
            { email : rawUserData.LoginValue},
            {phoneNumber : rawUserData.LoginValue}
        ]
    }

   })
   if(user){
    let isCorrectPassword = UnHassPassword(rawUserData.password,user.password)

    if(isCorrectPassword===true){
        // check  trạng thái groupRole của email or phoneNumber đã đăng nhập , 
        // gửi cookies  vào login để lấy quyền 
        let GroupWithRoles = await getGroupWithRole(user)
        let payload = {
            GroupWithRoles,
            expiresIn : process.env.JWT_expiresIn,
            email : user.email,
            username : user.username
        }
        let token = createJWT(payload)

        return {
            EM : "Login is  successfully",
            EC : 200,
            DT : {
                username : user.username,
                email : user.email, 

                access_token : token,
                roles : GroupWithRoles
            },
        }
        
    }
    return {
        EM : "Password is not correct ",
        EC : 400,
        DT :""
   }
}
   else{
    console.log(">>Not found user with email or Phone number", rawUserData.LoginValue)
    return {
        EM:"Email or PhoneNumber is not exist",
        EC:  400,
        DT : ""
    }
   }
}catch (error){
    console.log(error)
    return {
        EM : "error from server",
        EC : 500,
    }
}
}
    


module.exports = {RegisterService , LoginService ,isEmail,isPhone ,hashPassword} 