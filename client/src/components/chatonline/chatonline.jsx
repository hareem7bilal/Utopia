import axios from 'axios'
import { useEffect,useState } from 'react'
import './chatonline.css'


function Chatonline({onlineUsers, currentUserId,setCurrentChat}) {
    const public_folder=process.env.REACT_APP_PUBLIC_FOLDER;
    const [onlineFriends, setOnlineFriends]=useState([])
    const [friends, setFriends]=useState([])

    useEffect(()=>{
        const fetchFriends=async()=>{
            const res=await axios.get("users/friends/"+currentUserId)
            setFriends(res.data)
        }
        fetchFriends()
    },[currentUserId])

    useEffect(()=>{
        setOnlineFriends(friends.filter(f=>onlineUsers.includes(f._id)))
    },[friends,onlineUsers])

    const handleClick=async(onlineFriend)=>{
        try{
            const res=await axios.get(`/chats/find/${currentUserId}/${onlineFriend._id}`)
            setCurrentChat(res.data)
        }catch(err){
            console.log(err)
        }
    }

            return (
                <div className="chatOnline">
                    {onlineFriends.map((o)=>(
                    <div className="chatOnlineFriend" onClick={()=>handleClick(o)}>
                        <div className="chatOnlineImgContainer">
                            <img className="chatOnlineImg" src={o?.profilePicture?public_folder+o.profilePicture:public_folder+"person/noAvatar.png"} alt="online friend" />
                            <div className="chatOnlineBadge"></div>
                        </div>
                        <span className="chatOnlineName">{o?.username}</span>
                    </div> 
                    ))} 
                </div>
            )   
        }   

export default Chatonline
