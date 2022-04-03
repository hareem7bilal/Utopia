const router=require("express").Router();
const Chat=require("../models/Chat");


//create new chat
router.post("/",async(req,res)=>{
    const newChat= new Chat({
        participants:[req.body.senderId,req.body.recieverId]
    })
    try{
        const savedChat=await newChat.save();
        res.status(200).json(savedChat)
    }catch(err){
        res.status(500).json(err)
    }
})

//get all chats of a user
router.get("/:userId", async (req, res) => {
    try {
      const chat = await Chat.find({
        participants: { $in: [req.params.userId] },
      });
      res.status(200).json(chat);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //get a specific chat including 2 user Ids
  router.get("/find/:firstUserId/:secondUserId", async(req,res)=>{
    try{
      const chat = await Chat.findOne({
        participants: { $all: [req.params.firstUserId,req.params.secondUserId] }
      })
      res.status(200).json(chat);
    }catch(err){
      res.status(500).json(err)
    }
  })

module.exports=router;