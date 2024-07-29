import db from "../models"
// lấy dữ liệu quyền từ db 
const getGroupWithRole = async(user)=>{
    try {
        let roles = await db.Group.findOne({
            where: { id: user.groupId },
            attributes: ["id", "name", "description"], // Exclude createdAt and updatedAt
            include: {
                model: db.Role,
                attributes: ["id", "url", "description"],
                through: { attributes: [] }
            }
        });

        return roles ? roles : {};
    } catch (error) {
        console.error("Error fetching group:", error);
        return {}; // Handle the error gracefully
    }   
}


module.exports = {getGroupWithRole}