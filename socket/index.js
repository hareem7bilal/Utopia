const io=require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000"
    }
})

let users=[]

const addUser=(userId, socketId)=>{
    !users.some(user=>user.userId===userId)&&users.push({userId, socketId})
}

const getUser=(userId)=>{
    return users.find(user=>user.userId===userId)
}

const removeUser=(socketId)=>{
    users=users.filter(user=>user.socketId!==socketId)
}

io.on("connection",(socket)=>{
    console.log("A user connected!")//when user is connected
    
    socket.on("addUser",(userId)=>{//get user and socket id
    addUser(userId, socket.id)
    io.emit("getUsers", users);
   })

   //send and get message
   socket.on("sendMsg",({senderId, recieverId,text})=>{
       const reciever=getUser(recieverId);
       io.to(reciever.socketId).emit("getMsg",{senderId, text})
   })

   socket.on("disconnect",()=>{//when user leaves
    console.log("A user disconnected!") 
    removeUser(socket.id)
    io.emit("getUsers", users);
   })
})