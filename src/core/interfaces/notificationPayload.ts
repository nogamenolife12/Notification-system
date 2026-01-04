export interface NotificationPayload {
    recipientID: string;
    type: 'TASK_ASSIGNED' | 'TASK_UPDATED';
    content: string;
    priority?: 'low' | 'normal' | 'high';
    metadata?: Record<string, any>;      // For extra flexible data
}