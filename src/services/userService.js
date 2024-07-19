import db from '../models/index'
const getUserList = async()=>{
    let newUser = await db.User.findOne({
        where : {id : 1},
        attributes:["id","username","email","gender"],
        raw : true,
        include : {model: db.Group ,  attributes:["name","description"]},
        nest : true

    })
    const role = await db.Role.findAll({
        include: {
          model: db.Group,
          attributes: ["name", "description"], where: {id :1 },
        },
       
        raw : true,
        nest : true
      });
    console.log(">>>check new user ", newUser)
    console.log(">>>check new role ", role)

}




module.exports = {
    getUserList
}