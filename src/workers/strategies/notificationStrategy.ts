import { NotificationPayload } from "../../core/interfaces/notificationPayload"
export interface notificationStrategy {
    send(payload : NotificationPayload) : Promise<void>
}