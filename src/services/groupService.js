import db from "../models";

const readFunc =async()=>{
    try {
        let group = await db.Group.findAll({
            order :[['name', 'ASC']],
        })
        if(group){
            return{
                EM:"ok",
                EC: 0,
                DT : group
            }
        } 
        return{
                EM:"not found any thing",
                EC: 2,
                DT : []
            
        }
    } catch (error) {
        console.log(error)
        return{
            EM:"error from server",
            EC: 1,
            DT : []
        
    }
    }
   
}
module.exports = {readFunc } 