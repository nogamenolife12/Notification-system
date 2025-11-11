export interface Notification {
    id: string;
    userId: string;
    message: string;
    type: 'push' | 'email';
    status: 'pending' | 'delivered' | 'failed';
    createdAt: Date;
    updatedAt: Date;
}

export interface UserPreference {
    userId: string;
    prefersPush: boolean;
    prefersEmail: boolean;
    emailDigestFrequency: 'hourly' | 'daily' | 'weekly';
    urgentNotifications: boolean;
}