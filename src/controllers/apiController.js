import RegisterService from '../services/loginRegisterService'
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
        if (data.EC === 0) {
            return res.status(201).json({
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
                EC : "-1",
                DT : ""
            })
    }
}
module.exports = { handleRegister}