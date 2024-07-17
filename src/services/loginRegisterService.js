import { where } from 'sequelize'
import db from '../models/index'
import bcrypt  from 'bcrypt'
import {Op} from 'sequelize';
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
            EC : 1
        }
        }  
        const CheckPhone =await isPhone(rawUserData.phone) // xử lí check phone valid
        console.log(CheckPhone)

        if (CheckPhone === true ){
        return {
            EM : 'The Phone Number is exist',
            EC : 1
        }
    }
    const PasswordHashed = hashPassword(rawUserData.password)
    await db.User.create({
       email : rawUserData.email , 
       username : rawUserData.username,
       password  : PasswordHashed,
       phoneNumber  : rawUserData.phone

    })
    return {
        EM : "A user is created successfully !",
        EC :  0
    }
    }
    catch(error) {
        console.log(error)
        return {
            EM : "Somethings wrong in service",
            EC : -2
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
    if(!isCorrectPassword){
        return {
            EM:"Password is incorrect",
            EC: "1",
            DT : ""
        }
        
    }
    return {
        EM : "Login is  succesfully",
        EC : 0,
        DT :""
    }
    
   }
   else{
    console.log(">>Not found user with email or Phone number", rawUserData.LoginValue)
    return {
        EM:"Email or PhoneNumber is not exist",
        EC:  1,
        DT : ""
    }
   }
}catch (error){
    console.log(error)
    return {
        EM : "error from server",
        EC : 2,
    }
}
}
    


module.exports = {RegisterService , LoginService ,isEmail,isPhone ,hashPassword} 