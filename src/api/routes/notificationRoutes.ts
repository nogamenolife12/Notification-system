import { Router } from "express";
import { createNotification } from "../controllers/notificationController";
import { Notification } from "../../models/notifications";

const router = Router()

router.post("/",createNotification)

router.get("/history",async(req,res)=>{
    const logs = await Notification.find().sort({createdAt : -1})
})

export default router;