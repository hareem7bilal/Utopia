import "./profile.css";
import Feed from "../../components/feed/feed";
import Leftbar from "../../components/leftbar/leftbar";
import Rightbar from "../../components/rightbar/rightbar";
import Topbar from "../../components/topbar/topbar";
import {useState,useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router"

function Profile() {
  const public_folder=process.env.REACT_APP_PUBLIC_FOLDER
  const [user, setUser]=useState({})
  const username=useParams().username;


  useEffect(() => {
    const fetchUser=async()=>{
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data)
    }
    fetchUser();
 
}, [username]);


  return (
    <>
      <Topbar />
      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={user.coverPicture?public_folder+user.coverPicture:public_folder+"person/noCover.png"}
                alt="cover photo"
                className="profileCoverImg"
              />
              <img
                src={user.profilePicture?public_folder+user.profilePicture:public_folder+"person/noAvatar.png"}
                alt="user photo"
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileUserName">{user.username}</h4>
                <span className="profileDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username}/>
            <Rightbar user={user}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
