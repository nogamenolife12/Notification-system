import { NotificationService } from '../services/notificationService';
import { PreferenceService } from '../services/preferenceService';

const preferenceService = new PreferenceService();
const notificationService = new NotificationService(preferenceService);

export const digestJob = async () => {

    for (const user of users) {
        const notifications = await notificationService.getPendingNotificationsForUser(user.id);
        
        if (notifications.length > 0) {
            await notificationService.sendEmailDigest(user, notifications);
        }
    }
};

// Schedule this job to run every hour
setInterval(digestJob, 60 * 60 * 1000);