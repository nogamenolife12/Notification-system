export class RetryManager {
    private maxRetries: number;
    private retryDelay: number;

    constructor(maxRetries: number = 5, retryDelay: number = 1000) {
        this.maxRetries = maxRetries;
        this.retryDelay = retryDelay;
    }

    public async retry<T>(operation: () => Promise<T>): Promise<T> {
        let attempt = 0;

        while (attempt < this.maxRetries) {
            try {
                return await operation();
            } catch (error) {
                attempt++;
                if (attempt >= this.maxRetries) {
                    throw new Error(`Operation failed after ${this.maxRetries} attempts: ${error.message}`);
                }
                await this.delay(this.getExponentialBackoffDelay(attempt));
            }
        }

        throw new Error('Operation failed without a valid return');
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private getExponentialBackoffDelay(attempt: number): number {
        return this.retryDelay * Math.pow(2, attempt - 1);
    }
}