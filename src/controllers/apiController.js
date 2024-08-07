import {RegisterService ,LoginService, } from '../services/loginRegisterService'
import {CreateUser} from '../services/userApiService'

// authenticate user 
const handleRegister =async(req,res) => {
    try {

        if(!req.body.email || !req.body.phone || !req.body.password){
            return res.status(200).json({
                EM : "Missing required parameters",
                EC : '1',
                DT  : ""
            })
        }
        if (!req.body.password && req.body.password.lenght <8 ){
            return res.status(401).json({
              EM:'Your Password must have more than 8 letters',
              EC :'1',
              DT : ""
            })
        }
        const data = await RegisterService(req.body);
        if (data.EC === 200) {
            return res.status(200).json({
              EM: data.EM,
              EC: data.EC,
              // Include relevant data from data (e.g., user ID)
              DT: { userId: data.userId }, // Replace with actual data field name
            });
          }
          return res.status(400).json({ // Adjust status code as needed
            EM: data.EM,
            EC: data.EC,
            DT: "",
          });
    } catch (error) {
            return res.status(500).json({
                EM: " error from server ",
                EC : data.EC,
                DT : ""
            })
    }
}
const HandleLogin = async(req,res)=>{
  // console.log("check value Login >> " , req.body)
  
  try {

    let data = await LoginService(req.body)
    // input cookies 
    if(data && data.DT && data.DT.access_token){
    res.cookie('jwt', data.DT.access_token, { httpOnly: true,maxAge : 60  *60 *1000 });
    } // corrected method is res.cookie, not res.cookies
    if(data.EC === 200 ){
      return res.status(200).json({
        EM : data.EM,
        EC : data.EC,
        DT : data.DT, 
      })
    }
    return res.status(400).json({ 
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Internal Server Error", 
      EC: 500, 
      DT: "",
  })
  }
}
const HandleCreate =async(req,res)=>{
  console.log("check value user >> " , req.body)
  try {
    const data = await CreateUser(req.body)
    if(data.EC === 0 ){
      return res.status(200).json({
        EM : data.EM,
        EC : data.EC,
        DT : data

      })
    }
    return res.status(400).json({ // Adjust status code as needed
      EM: data.EM,
      EC: data.EC,
      DT : data
    });
  } catch (error) {
      return res.status(500).json({
      EM:" error from Server",
      EC : 2,
      DT : ""
  })
  }
}
const HandleLogout = async(req,res)=>{
  try {
      res.clearCookies('jwt')
      return res.status(200).json({
        EM : 'clear cookies done!',
        EC : 200,
        DT : ""
      })
    
   
  } catch (error) {
      return res.status(500).json({
      EM:" error from Server",
      EC : 500,
      DT : ""
  })
  }
}



module.exports = { handleRegister , HandleLogin,HandleCreate,HandleLogout } 