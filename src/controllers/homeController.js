import { getUserList} from '../services/userService'

const HomePage =async (req,res)=>{

   console.log('coookies' , req.cookies)
   console.log('signed cookies', req.signedCookies)
   let userlist = await getUserList()
   return res.send('userlist',{userlist})
}


module.exports = {
    HomePage
}