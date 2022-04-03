import "./leftbar.css";
import {Link} from "react-router-dom"

import Onlinefriends from '../onlinefriends/onlinefriends'

import {
  Info,
  Chat,
  HelpOutline
} from "@mui/icons-material";


function Leftbar({u}) {
  

  return (
    <div className="leftbar">
      <div className="leftbarWrapper">
        <ul className="leftbarList">

        <Link to="/messenger" style={{textDecoration:"none",color:"black"}}>
          <li className="leftbarListItem">
            <Chat className="leftbarIcon" />
            <span className="leftbarListItemText">Chat</span>
          </li>
          </Link>


          <li className="leftbarListItem">
            <Info className="leftbarIcon" />
            <span className="leftbarListItemText">About Us</span>
          </li>
          <li className="leftbarListItem">
            <HelpOutline className="leftbarIcon" />
            <span className="leftbarListItemText">FAQ</span>
          </li>
        </ul>
        <hr className="leftbarLine" />

        <div className="birthdayContainer">
          <img src="assets/gift.png" alt="bday pic" className="birthdayImg" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today!
          </span>
        </div>
        <hr className="leftbarLine" />
        <h4 className="leftbarTitle">Friends</h4>
        <ul className="leftbarFriendList">
      
        </ul>
      </div>
    </div>
  );
}

export default Leftbar;
