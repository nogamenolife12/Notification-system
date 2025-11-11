import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'notification_system',
  },
  notification: {
    push: {
      serviceUrl: process.env.PUSH_SERVICE_URL || 'https://push.service.com',
      apiKey: process.env.PUSH_API_KEY || '',
    },
    email: {
      service: process.env.EMAIL_SERVICE || 'gmail',
      user: process.env.EMAIL_USER || '',
      password: process.env.EMAIL_PASSWORD || '',
    },
  },
  retry: {
    maxAttempts: (() => {
      const parsed = parseInt(process.env.RETRY_MAX_ATTEMPTS ?? '', 10);
      return Number.isNaN(parsed) ? 5 : parsed;
    })(),
    backoffStrategy: process.env.RETRY_BACKOFF_STRATEGY || 'exponential',
  },
  preferences: {
    defaultNotificationMethod: process.env.DEFAULT_NOTIFICATION_METHOD || 'push',
  },
};

export default config;