export interface Notification {
    id: string;
    userId: string;
    message: string;
    type: 'push' | 'email';
    status: 'pending' | 'delivered' | 'failed';
    createdAt: Date;
    updatedAt: Date;
    urgent: boolean;
}