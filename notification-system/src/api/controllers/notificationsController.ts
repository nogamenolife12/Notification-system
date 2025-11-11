import { NotificationService } from '../../services/notificationService';
import { PreferenceService } from '../../services/preferenceService';

export class NotificationsController {
    constructor(private notificationService: NotificationService, private preferenceService: PreferenceService) {}

    async createNotification(req, res) {
        try {
            const { userId, message, type } = req.body;
            const notification = await this.notificationService.createNotification({ userId, message, type });
            res.status(201).json(notification);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create notification' });
        }
    }

    async updateNotification(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const updatedNotification = await this.notificationService.updateNotification({id, status});
            res.status(200).json(updatedNotification);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update notification' });
        }
    }

    async getNotifications(req, res) {
        try {
            const { userId } = req.params;
            const notifications = await this.notificationService.getNotification(userId);
            res.status(200).json(notifications);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve notifications' });
        }
    }
}

export default NotificationsController;