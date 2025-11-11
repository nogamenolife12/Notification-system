export class EmailProcessor {
    private emailService: any; // Replace with actual email service type
    private retryManager: any; // Replace with actual retry manager type

    constructor(emailService: any, retryManager: any) {
        this.emailService = emailService;
        this.retryManager = retryManager;
    }

    public async sendEmailNotification(notification: any): Promise<void> {
        try {
            const emailContent = this.formatEmail(notification);
            await this.emailService.send(emailContent);
        } catch (error) {
            this.retryManager.scheduleRetry(notification);
        }
    }

    private formatEmail(notification: any): any {
        // Format the email content based on the notification details
        return {
            to: notification.userEmail,
            subject: `Notification: ${notification.title}`,
            body: notification.message,
        };
    }
}