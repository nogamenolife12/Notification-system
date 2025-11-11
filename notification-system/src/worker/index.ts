import { NotificationService } from '../services/notificationService';
import { PreferenceService } from '../services/preferenceService';
import { PushProcessor } from './processors/pushProcessor';
import { EmailProcessor } from './processors/emailProcessor';
import { RetryManager } from './retry/retryManager';

class NotificationWorker {
    private notificationService: NotificationService;
    private preferenceService: PreferenceService;
    private pushProcessor: PushProcessor;
    private emailProcessor: EmailProcessor;
    private retryManager: RetryManager;

    constructor() {
        this.notificationService = new NotificationService();
        this.preferenceService = new PreferenceService();
        this.pushProcessor = new PushProcessor();
        this.emailProcessor = new EmailProcessor();
        this.retryManager = new RetryManager();
    }

    public async processNotifications(notificationData: any[]) {
        const batchedNotifications = this.batchNotifications(notificationData);

        for (const batch of batchedNotifications) {
            for (const notification of batch) {
                const preferences = await this.preferenceService.getUserPreferences(notification.userId);
                if (preferences.push) {
                    this.pushProcessor.send(notification);
                }
                if (preferences.email) {
                    this.emailProcessor.send(notification);
                }
            }
        }
    }

    private batchNotifications(notificationData: any[]) {
        const batched: { [key: string]: any[] } = {};
        notificationData.forEach(notification => {
            const userId = notification.userId;
            if (!batched[userId]) {
                batched[userId] = [];
            }
            batched[userId].push(notification);
        });
        return Object.values(batched);
    }
}

const worker = new NotificationWorker();

// Simulate receiving notifications
setInterval(async () => {
    const notifications = await worker.notificationService.getPendingNotifications();
    if (notifications.length > 0) {
        await worker.processNotifications(notifications);
    }
}, 60000); // Check for notifications every minute