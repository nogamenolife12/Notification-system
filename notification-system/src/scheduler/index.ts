import { scheduleJob } from 'node-schedule';
import { sendDigestNotifications } from '../services/notificationService';

const scheduleDigestJob = () => {
    // Schedule the digest job to run every hour
    scheduleJob('0 * * * *', () => {
        sendDigestNotifications();
    });
};

const initializeScheduler = () => {
    scheduleDigestJob();
};

export default initializeScheduler;