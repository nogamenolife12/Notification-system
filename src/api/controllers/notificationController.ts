import { Request , Response } from "express";
import { notificationQueue } from "../../queue/notificationQueue";

export async function createNotification(req : Request , res : Response){
    try{
    const {recipientID,content,type,priority} = req.body;
    await notificationQueue.add('notifications',{
        recipientID : recipientID,
        content : content,
        type : type,
        priority:priority,
    },{
        attempts:3,
        backoff : {
            type : "exponential",
            delay: 5000,
        }
    })
    res.status(201).json({message : "Notification queued successfylly"});
    }catch(err){
        res.status(500).json({
            error : (err as Error).message || "Failed to create notification"
        })
    }
}