# Notification System

A notification queuing system built with Node.js, Express, TypeScript, BullMQ, and MongoDB.

## Tech Stack

- Node.js + Express
- TypeScript
- BullMQ (job queue)
- Redis (queue storage)
- MongoDB + Mongoose (data persistence)
- dotenv (environment configuration)

## Project Structure

```
src/
├── api/
│   ├── controllers/notificationController.ts
│   ├── routes/notificationRoutes.ts
│   └── server.ts
├── config/
│   ├── index.ts
│   └── redis.ts
├── core/interfaces/notificationPayload.ts
├── db/index.ts
├── models/notifications.ts
├── queue/notificationQueue.ts
├── workers/
│   ├── strategies/
│   │   ├── notificationStrategy.ts
│   │   └── emailStrategy.ts
│   └── notificationWorker.ts
└── index.ts
```

## Prerequisites

- Node.js (>=20.19.0)
- MongoDB (running)
- Redis (running on localhost:6379)

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/notifications
JWT_SECRET=your_secret_key
```

## Running

### Build
```bash
npm run build
```

### Production
```bash
npm start
```

### Development - API only
```bash
npm run start:api
```

### Development - Worker only
```bash
npm run start:worker
```

### Development - Both API and Worker
```bash
npm run dev
```

### Development - With nodemon
```bash
npm run dev:nodemon
```

## API Endpoints

### Create Notification
`POST /api/notification`

**Request Body:**
```json
{
  "recipientID": "user123",
  "content": "Notification message",
  "type": "TASK_ASSIGNED",
  "priority": "high"
}
```

**Response:**
```json
{
  "message": "Notification queued successfylly"
}
```

### Get History
`GET /api/notification/history`

(Note: Route exists but response not implemented)

### Health Check
`GET /`

**Response:**
```json
{
  "message": "Server is running"
}
```

## Notification Types

- `TASK_ASSIGNED`
- `TASK_UPDATED`

## Priority Levels

- `low`
- `normal` (default)
- `medium`
- `high`

## How It Works

1. API receives notification request
2. Notification added to BullMQ queue with retry configuration (3 attempts, exponential backoff starting at 5s)
3. Worker picks up job from Redis
4. EmailStrategy processes notification (2-second simulated delay)
5. Notification status saved to MongoDB as 'sent' or 'failed'

## MongoDB Schema

```typescript
{
  recipientID: String (required)
  type: 'TASK_ASSIGNED' | 'TASK_UPDATED'
  priority: 'low' | 'normal' | 'medium' | 'high' (default: 'normal')
  status: 'pending' | 'sent' | 'failed' (default: 'pending')
  content: String (required)
  metadata: Object (default: {})
  jobId: String (required, unique, indexed)
  timestamps: createdAt, updatedAt
}
```

## Redis Configuration

- Host: 127.0.0.1
- Port: 6379

## Project Roadmap & Status

The core infrastructure (Queue, Worker, Strategy Pattern) is complete. I am currently transitioning from a "Simple Pipe" to an "Intelligent Dispatcher" to meet the full project requirements.

### **Done**
- Basic Producer-Consumer Architecture (Node.js + BullMQ).
- Extensible Strategy Pattern for delivery providers.
- Asynchronous persistence logic (MongoDB + Redis AOF).

### **Current Focus**
- **Notification Fan-out:** Implementing the logic to map 1 task update to 3-5 recipients (assignees, managers, watchers).
- **User Preference Engine:** Filtering delivery channels based on individual user settings (Email vs. Push).

### **Up Next**
- **Intelligent Batching (Debouncing):** Developing a "buffer" mechanism to prevent user spam (e.g., grouping 10 updates into 1 notification).
- **Urgency-Based Routing:** Prioritizing "Due in 1 hour" notifications over routine updates.
- **Performance Benchmarking:** Load testing the system against the 40k/min burst scenario.