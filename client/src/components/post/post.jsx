import './post.css'
import {MoreVert} from "@mui/icons-material";
import {useState,useEffect} from "react";
import axios from "axios";
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/authContext';
import {useContext} from "react"

function Post({p}) {
    const {user:currentUser}=useContext(AuthContext);
    const [like, setLike]=useState(p.likes.length)
    const [isLiked, setIsLiked]=useState(false)
    const [user, setUser]=useState({})
    const public_folder=process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        setIsLiked(p.likes.includes(currentUser._id))
    }, [currentUser._id,p.likes]);

    useEffect(() => {
        const fetchUser=async()=>{
          const res = await axios.get(`/users?userId=${p.userId}`);
          setUser(res.data)
        }
        fetchUser();
     
    }, [p.userId]);

    const likeHandler=()=>{
        try{
            axios.put("/posts/"+p._id+"/like",{userId:currentUser._id});
        }catch(err){

        }
        setLike(isLiked?like-1:like+1);
        setIsLiked(!isLiked);
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                        <img src={user.profilePicture?public_folder+user.profilePicture:public_folder+"person/noAvatar.png"} alt="profile pic" className="postProfileImg" />
                        </Link>
                        <span className="postUserName">{user.username}</span>
                        <span className="postDate">{format(p.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{p?.desc}</span>
                    <img src={public_folder+p.img} alt="post pic" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src={`${public_folder}like.png`} alt="like icon" onClick={likeHandler} className="likeIcon" />
                        <img src={`${public_folder}heart.png`} alt="heart icon" onClick={likeHandler} className="likeIcon" />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{p.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
