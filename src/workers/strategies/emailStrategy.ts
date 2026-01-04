import { notificationStrategy } from "./notificationStrategy";
import { NotificationPayload } from "../../core/interfaces/notificationPayload";
export class EmailStrategy implements notificationStrategy {
    async send(payload :NotificationPayload) : Promise <void> {
        const {recipientID,content} = payload

        //Simulating a network delay (like calling an API)
        await new Promise((resolve)=>setTimeout(resolve,2000));

        console.log(`[EmailStrategy] Email sent to ${recipientID}`)
    }
}

export const emailStrategy = new EmailStrategy();