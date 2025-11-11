interface Recipient {
    userId: string;
    // additional recipient fields allowed
    [key: string]: any;
}

export class NotificationService {
    private notifications: any[] = []; // Store notifications temporarily
    private userPreferences: Map<string, any>; // Map to store user preferences

    constructor(preferenceService: any) {
        this.userPreferences = preferenceService.getAllUserPreferences();
    }

    public createNotification(notification: any) {
        this.notifications.push(notification);
        this.processNotification(notification);
    }

    private processNotification(notification: any) {
        const recipients = this.getRecipients(notification);
        recipients.forEach((recipient:Recipient) => {
            const preference = this.userPreferences.get(recipient.userId);
            if (preference) {
                if (preference.instant) {
                    this.sendInstantNotification(recipient, notification);
                } else {
                    this.batchNotification(recipient, notification);
                }
            }
        });
    }

    public updateNotification(notification: any) {
        const index = this.notifications.findIndex((n) => n.id === notification.id);
        if (index !== -1) {
            this.notifications[index] = { ...this.notifications[index], ...notification };
            return this.notifications[index];
        }
        throw new Error('Notification not found');
    }

     public getNotification(notification: any) {
        return this.notifications.find((n) => n.id === notification.id);
    }


    private getRecipients(notification: any) {
        // Logic to get recipients based on the notification type
        return notification.recipients;
    }

    private sendInstantNotification(recipient: any, notification: any) {
        // Logic to send instant notifications (e.g., push notifications)
    }

    private batchNotification(recipient: any, notification: any) {
        // Logic to batch notifications for users who prefer digest
    }

    public retryFailedNotifications() {
        // Logic to retry sending failed notifications
    }

    public sendPushNotification(notification:any) {
        // Logic to send push notifications
    }

    public sendEmailNotification(notification:any) {
        // Logic to retry sending failed notifications
    }

    public getPendingNotificationsForUser(userId: string) {
        return this.notifications.filter((n) => n.userId === userId && n.status === 'pending');
    }

    public sendEmailDigest(userId: string, notifications: any[]) {
        // Logic to send email digest
    }

}