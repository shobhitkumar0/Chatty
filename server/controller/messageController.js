const mongoose = require('mongoose');
const messageModel = require('../model/messageModel');
module.exports.addMessage = async (req, res, next) => {
    try {
       const {from,to,message}=req.body;
       const data=await messageModel.create({
        message:{text:message},
        users:[from,to],
        sender:from,
       });
       if(data) return res.json({status:"true",msg:"Message added successfully"});
       return res.json({status:"false",msg:"Failed to add message in to database"})
    } catch (error) {
        next(error);
    }
};
module.exports.getAllMessage = async (req, res, next) => {
    try {
        const{ from,to}=req.body;;
        const messages=await messageModel.find({
            users:{
                $all:[from,to],
            },
        })
        .sort({updated:1});
        const projectMessages=messages.map((msg)=>{
            return{
                fromSelf:msg.sender.toString()===from,
                message:msg.message.text,
            };
        });
        res.json(projectMessages)
        
    } catch (error) {
        
    }
};