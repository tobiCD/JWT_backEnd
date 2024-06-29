import { getUserList} from '../services/userService'

const HomePage =async (req,res)=>{

    const newuser = await getUserList()
    res.send('hihiih')
}


module.exports = {
    HomePage
}