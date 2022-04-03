import './onlinefriends.css'

function Onlinefriends({u}) {
    const public_folder=process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <li className="rightbarFriend">
        <div className="rightbarFriendImgContainer">
            <img src={public_folder+u.profilePicture} alt="online friend" className="rightbarFriendImg" />
            <span className="rightbarOnlineBadge"></span>
        </div>
        <span className="rightbarFriendName">{u.username}</span>
    </li>
    )
}

export default Onlinefriends
