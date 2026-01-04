import { Schema,model } from "mongoose";

const userSchema = new Schema({
    recipientID : {
        type: String,
        required: true,
    },
    type : {
        type : String,
        enum : ['TASK_ASSIGNED', 'TASK_UPDATED'],
    },
    priority : {
        type: String,
        enum: ['normal','low','medium','high'],
        default : 'normal'
    },
    status: {
        type: String,
        enum: ['pending','sent','failed'],
        default: 'pending',
    },
    content : {
        type: String,
        required: true,
    },
    metadata : {
        type: Object,
        default:{}
    },
    jobId : {
        type: String,
        required: true,
        unique: true,
        index: true,
    }
},  
    {
        timestamps:true
    }
)

export const Notification = model('Notification',userSchema);