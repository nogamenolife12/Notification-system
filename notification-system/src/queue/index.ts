import Queue from 'bull';
import { Notification } from '../models/notification';
import { NotificationService } from '../services/notificationService';
import { PreferenceService } from '../services/preferenceService';

const notificationQueue = new Queue<Notification>('notificationQueue');

notificationQueue.process(async (job: { data: any; }) => {
    const preferenceService = new PreferenceService();
    const notificationService = new NotificationService(preferenceService);

    const notification = job.data;

    // Retrieve user preferences
    const preferences = await preferenceService.getUserPreference(notification.userId);

    // Process notification based on preferences
    if ((preferences as any)?.push) {
        // Send push notification
        await notificationService.sendPushNotification(notification);
    }

    if ((preferences as any)?.email) {
        // Send email notification
        await notificationService.sendEmailNotification(notification);
    }
});

// Function to add notification to the queue
export const addNotificationToQueue = (notification: Notification) => {
    notificationQueue.add(notification);
};