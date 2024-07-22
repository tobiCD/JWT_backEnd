const userApiService = require('../services/userApiService')
const groupService = require('../services/groupService')
const ReadUser=async(req,res)=>{
    try {
        console.log(req.query)
        if(req.query.page && req.query.limit ){
            let page = req.query.page
            let limit = req.query.limit
            let data =await userApiService.getUserWithPanigation(page,limit)
            return res.status(200).json({
                    EM : data.EM,
                    EC : data.EC,
                    DT : data.DT
            })
        }
        else{
        let data = await userApiService.getAllUser();
        return res.status(200).json({
            EM : data.EM,
            EC : data.EC,
            DT : data.DT
        })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM : data.EM,
            EC : data.EC,
            DT : data.DT
        })
    }
}
const createUser=async(req,res)=>{

}
const updateUser=async(req,res)=>{
    try {
        console.log(req.body)
        const data = await userApiService.UpdateUser(req.body)
        return res.status(200).json({
            EM : data.EM,
            EC : data.EC,
            DT : data.DT
        })

    } catch (error) {
        return res.status(500).json({
            EM : data.EM,
            EC : data.EC,
            DT : data.DT
        })  
    }

}
const deleteUser=async(req,res)=>{
    try {
       let data = await userApiService.deleteUser(req.params.id)
    //    console.log(req.params.id)
        return res.status(200).json({
            EM : data.EM,
            EC : data.EC,
            DT : data.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM : data.EM,
            EC : data.EC,
            DT : data.DT
        })
    }

        }
     
const ReadGroup =async(req,res)=>{
    try {
        let data = await groupService.readFunc()
        return res.status(200).json({
            EM : data.EM,
            EC : data.EC,
            DT : data.DT
    })
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            EM : data.EM,
            EC : data.EC,
            DT : data.DT
    })
    }
}
module.exports ={
    deleteUser,createUser,ReadUser,updateUser,ReadGroup
}