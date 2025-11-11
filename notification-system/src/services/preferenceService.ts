export class PreferenceService {
    private userPreferences: Map<string, UserPreference>;

    constructor() {
        this.userPreferences = new Map();
    }

    public setUserPreference(userId: string, preference: UserPreference): void {
        this.userPreferences.set(userId, preference);
    }

    public getUserPreference(userId: string): UserPreference | undefined {
        return this.userPreferences.get(userId);
    }

    public getAllUserPreferences(): Map<string, UserPreference> {
        return this.userPreferences;
    }

    public getUsersWithDigestPreferences() {
        // Logic to get users who prefer digest notifications
    }
}

export interface UserPreference {
    userId: string;
    notificationType: 'push' | 'email' | 'both';
    emailDigestFrequency: 'hourly' | 'daily' | 'weekly';
    urgentNotifications: boolean;
}