import app from "./api/server";
import { connectDB } from "./db";
import { config } from "./config";

connectDB('Database connected to the API');
app.listen(config.port,()=>{
    console.log(`Server listening on port ${config.port}`)
})