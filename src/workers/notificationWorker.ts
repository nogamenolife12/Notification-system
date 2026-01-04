import { Worker , Job } from "bullmq";
import { redisConnection } from "../config/redis";
import { emailStrategy } from "./strategies/emailStrategy";
import { Notification } from "../models/notifications";
import { connectDB } from "../db";
connectDB("Database connected to the Worker");
const notificationWorker = new Worker('notifications',async(job : Job)=>{
    try{
    if(job.data.type === 'TASK_ASSIGNED' || job.data.type === 'TASK_UPDATED'){
        await emailStrategy.send(job.data);
        await Notification.create({
            ...job.data,
            jobId: job.id,
            status:'sent'
        })
        console.log(`[Worker] Job ${job.id} processed and saved to DB`)
    }
    }catch(err){
        await Notification.findOneAndUpdate(
            {jobId : job.id},
            {status : 'failed'},
            {
                upsert: true,
                new: true,
            }
        )
        console.log(`[Worker] Job ${job.id} failed:`,err)
        throw new Error("Job failed , retrying...")
    }
},{
    connection: redisConnection,
})