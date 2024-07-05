import { where } from 'sequelize'
import db from '../models/index'
import bcrypt  from 'bcrypt'
const salt = bcrypt.genSaltSync(10);
const hashPassword = (userPassword )=>{ // xử lí hashPassword cho register
    const hash = bcrypt.hashSync(userPassword, salt);
    return hash;

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



const RegisterService = async(rawUserData)=>{ // function nhận dữ liệu request chọc xuống database 
   try {
        const CheckEmail = await isEmail(rawUserData.email) // xử lí check email valid
        console.log(CheckEmail)
        if (CheckEmail === true ){
        return {
            EM : 'The email is exist',
            EC : '1'
        }
        }
        const CheckPhone =await isPhone(rawUserData.phone) // xử lí check phone valid
        console.log(CheckPhone)

        if (CheckPhone === true ){
        return {
            EM : 'The phone is exist',
            EC : '1'
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
        EC : 0
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


export default RegisterService