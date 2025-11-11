import { Router } from 'express';
import NotificationsController from '../controllers/notificationsController';
import { NotificationService } from '../../services/notificationService';
import { PreferenceService } from '../../services/preferenceService';

const preferenceService = new PreferenceService();
const notificationService = new NotificationService(preferenceService);
const notificationsController = new NotificationsController(notificationService, preferenceService);

const router = Router();

// Route to create a notification
router.post('/', notificationsController.createNotification.bind(notificationsController));

// Route to update a notification
router.put('/:id', notificationsController.updateNotification.bind(notificationsController));

// Route to get notifications for a user
router.get('/:userId', notificationsController.getNotifications.bind(notificationsController));

export default router;