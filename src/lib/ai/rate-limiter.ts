export class RateLimiter {
  private lastCallTime = 0;
  private readonly minDelay = 1000; // 1 second between calls
  private queue: (() => void)[] = [];
  private isProcessing = false;

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        const now = Date.now();
        const timeSinceLastCall = now - this.lastCallTime;
        
        if (timeSinceLastCall < this.minDelay) {
          await this.delay(this.minDelay - timeSinceLastCall);
        }

        this.lastCallTime = Date.now();
        task();
        
        await this.delay(100);
      }
    }

    this.isProcessing = false;
  }

  async enqueue<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.processQueue();
    });
  }
}

export const rateLimiter = new RateLimiter();