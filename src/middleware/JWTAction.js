import jwt from 'jsonwebtoken'
require('dotenv').config();
// tạo token jwt

const nonSecurePaths = ['/' , '/register', '/login',];

const createJWT = (payload)=>{
    try {
        let key = process.env.JWT_SECRET
        
        let token = jwt.sign(payload,key)
        // console.log(token) 
        return token
    } catch (error) {  
        console.log(error)  

}
}
// giải mã token 
const verifyToken =(token)=>{
    let key = process.env.JWT_SECRET
    let decoded = null;
    try {
         decoded = jwt.verify(token , key)
    } catch (error) {
        console.log(error)
    }
   return decoded;
    
}

// xử lí việc check validate cookies và user cookies 
const checkUserjwt = (req,res,next)=>{
    if( nonSecurePaths.includes(req.path)) return next();

    let cookies = req.cookies 
    if(cookies && cookies.jwt){
        let token = cookies.jwt 
        console.log('myjwt :' , token)

        let decoded = verifyToken(token)
        if(decoded){
            req.user = decoded
            req.token = token

            next();
        } 
        else {
            return res.status(401).json({
                EC : 401 , 
                DT :'', 
                EM : 'Not authorized '
            })
        }
    }
    else {
        return res.status(401).json({
            EC : 401 , 
            DT :'', 
            EM : 'Not authorized '
        })
    }
}

const checkUserPermission = (req,res,next)=>{
    if( nonSecurePaths.includes(req.path)|| req.path==='/account') return next();
    if(req.user){
        let email = req.user.email
        let roles = req.user.GroupWithRoles.Roles
        let currentUrl = req.path 
        if(!roles || roles.length === 0 ){
            return res.status(403).json({
                EC: 403 , 
                DT :'',
                EM: ` you don't have permission to acess ..`
            })
        }
        let canAcess = roles.some(item => item.url  === currentUrl)
        if(canAcess){
            next();
        }
        else{
            return res.status(403).json({
                    EC: 403 , 
                    DT :'',
                    EM: ` you don't have permission to acess ..`
                })
            
        }
    }
}

module.exports = {createJWT,verifyToken,checkUserjwt,checkUserPermission}