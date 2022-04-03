import "./topbar.css";
import {Search,Person,Chat,Notifications} from "@mui/icons-material";
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/authContext';
import {useContext} from "react"

function Topbar() {
    const {user}=useContext(AuthContext);
    const public_folder=process.env.REACT_APP_PUBLIC_FOLDER;

    return (
      <div className="topbarContainer">
        <div className="topbarLeft">
            <Link to="/" style={{textDecoration:"none"}}>
            <span className="logo">Utopia</span>
            </Link>
        </div>
        <div className="topbarCenter">
            <div className="searchbar">
                <Search className="searchIcon"/>
                <input placeholder="Search for friends, posts or videos" className="searchInput" />
            </div>
        </div>
        <div className="topbarRight">
            <div className="topbarLinks">
                <span className="topbarLink">Homepage</span>
                <span className="topbarLink">Timeline</span>
            </div>
            <div className="topbarIcons">
                <div className="topbarIconItem">
                    <Person/>
                    <span className="topbarIconBadge">1</span>
                </div>

                <Link to="/messenger" style={{color:"white"}}>
                <div className="topbarIconItem">
                    <Chat/>
                    <span className="topbarIconBadge">2</span>
                </div>
                </Link>

                <div className="topbarIconItem">
                    <Notifications/>
                    <span className="topbarIconBadge">1</span>
                </div>
            </div>
            <Link to={`/profile/${user.username}`}>
            <img src={user.profilePicture?public_folder+user.profilePicture:public_folder+"person/noAvatar.png"} alt="profile pic" className="topbarImg" />
            </Link>
        </div>
      </div>
    );
}

export default Topbar
