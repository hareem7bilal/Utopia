import {useEffect,useState} from "react"
import axios from "axios"
import Post from '../post/post'
import Share from '../share/share'
import './feed.css'
import React from 'react'
import { AuthContext } from '../../context/authContext';
import {useContext} from "react"


function Feed({username}) {
  const [posts, setPosts] = useState([]);
  const {user}=useContext(AuthContext);

  useEffect(() => {
      const fetchPosts=async()=>{
        const res = username ? await axios.get("/posts/profile/"+ username)
        :await axios.get("/posts/timeline/"+user._id);
        setPosts(res.data.sort((p1,p2)=>{
          return new Date(p2.createdAt)-new Date(p1.createdAt)
        }))
      }
      fetchPosts();
   
  }, [username,user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username||username===user.username)&&<Share />}
      {
          posts.map((post)=>(<Post key={post._id} p={post}/>))
      }
      </div>
    </div>
  );
}

export default Feed
