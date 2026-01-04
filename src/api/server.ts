import express, { Express } from "express";
import router from "./routes/notificationRoutes";
const notificationRouter = router;
const app = express();

app.use(express.json());
app.use('/api/notification',notificationRouter)

app.get('/',(req,res)=>{
    res.status(200).json({
        message : "Server is running"      //health Check
    })
})

export default app;