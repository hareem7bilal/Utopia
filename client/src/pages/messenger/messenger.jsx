import "./messenger.css";
import Topbar from "../../components/topbar/topbar";
import Chat from "../../components/chat/chat";
import Message from "../../components/message/message";
import Chatonline from "../../components/chatonline/chatonline";
import { AuthContext } from "../../context/authContext";
import { useContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";

function Messenger() {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [arrivalMsg, setArrivalMsg] = useState(null);
  const [newMsg, setNewMsg] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMsg", (data) => {
      setArrivalMsg({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMsg &&
      currentChat?.participants.includes(arrivalMsg.sender) &&
      setMsgs((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(user.following.filter(f=>users.some(u=>u.userId===f)));
      console.log(users)
    });
  }, [user]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get("/chats/" + user._id);
        setChats(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchChats();
  }, [user._id]);

  useEffect(() => {
    const fetchMsgs = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMsgs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMsgs();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const msg = {
      sender: user._id,
      text: newMsg,
      ChatID: currentChat._id,
    };

    const recieverId = currentChat.participants.find((p) => p != user._id);
    socket.current.emit("sendMsg", {
      senderId: user._id,
      recieverId,
      text: newMsg,
    });

    try {
      const res = await axios.post("/messages", msg);
      setMsgs([...msgs, res.data]);
      setNewMsg("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {chats.map((chat) => (
              <div onClick={() => setCurrentChat(chat)}>
                <Chat c={chat} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {msgs.map((msg) => (
                    <div ref={scrollRef}>
                      <Message m={msg} own={msg.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    placeholder="Write something..."
                    className="chatMsgInput"
                    onChange={(e) => setNewMsg(e.target.value)}
                    value={newMsg}
                  ></textarea>
                  <button className="chatSendButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noChatText">Start Chatting!</span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <Chatonline
              onlineUsers={onlineUsers}
              currentUserId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
