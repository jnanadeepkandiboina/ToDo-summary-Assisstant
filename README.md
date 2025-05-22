# ToDo-summary-Assisstant
A full-stack app to manage todos, summarize them using OpenAI, and send the summary to Slack.

## Tech Stack
- Frontend: React
- Backend: Node.js + Express
- Database: postgresql
- LLM: OpenAI GPT
- Slack: Webhook Integration

## Setup

### 1. Backend
```bash
cd backendd
npm install
cp .env
# Fill in your OpenAI key and Slack webhook URL
node index.js
```

### 2. Frontend
```bash
cd frontendd
npm install
npm start
```

## Features
- Add/Delete todos
- Summarize all todos via OpenAI
- Post summary to Slack
