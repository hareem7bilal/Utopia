import './chat.css'
import {useState, useEffect} from 'react'
import axios from 'axios'

function Chat({c,currentUser}) {
    const public_folder=process.env.REACT_APP_PUBLIC_FOLDER;
    const [user,setUser]=useState(null)

    useEffect(()=>{
       
        const friendId=c.participants.find(p=>p!==currentUser._id)

        const getUser=async()=>{
            try{
                const res=await axios.get("/users?userId="+friendId)
                setUser(res.data)
            }catch(err){
                console.log(err)
            }
        }
        getUser()

    },[currentUser,c])

    return (
        <div className="chat">
            <img src={user?.profilePicture?public_folder+user.profilePicture:public_folder+"person/noAvatar.png"} alt="" className="chatImg" />
            <span className="chatName">{user?.username}</span>
        </div>
    )
}

export default Chat
