const router=require("express").Router();
const Message=require("../models/Message");

//create new msg
router.post("/",async(req,res)=>{
    const newMsg= new Message(req.body)
    try{
        const savedMsg=await newMsg.save();
        res.status(200).json(savedMsg)
    }catch(err){
        res.status(500).json(err)
    }
})

//get msgs of a chat
router.get("/:chatId", async(req,res)=>{
    try{
        const msgs=await Message.find({ChatID:req.params.chatId})
        res.status(200).json(msgs)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports=router;

module.exports=router;