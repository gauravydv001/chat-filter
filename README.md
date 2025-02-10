# Chat Filter

## Overview
Chat Filter is a real-time chat filtering application built using Express.js and Next.js. It allows users to search, filter, and manage messages within different groups. It is designed to be scalable and efficient, supporting various filters like message length, attachment types, message content, and more.

## Features
- User authentication and authorization via JWT.
- Search messages by content, sender, and group.
- Filter messages by date, attachments, and message type.
- Mark messages as read/unread.

## Tech Stack
- **Backend**: Express.js, TypeScript, MongoDB
- **Frontend**: Next.js, React, TypeScript
- **Authentication**: JSON Web Tokens (JWT)
- **Database**: MongoDB
- **Deployment**: Docker, Heroku, or any cloud service

## Setup

### 1. Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/gauravydv001/chat-filter.git
cd chat-filter
```
###Install Dependencies
```bash
cd chat-backend
npm install

Frontend
cd chat-frontend
npm install
```

3. Environment Variables
Backend

Inside chat-backend/.env

Frontend

Inside chat-frontend/.env.local




4. Running the Application
Start Backend:

Navigate to chat-backend
```bash npm run dev  ```

Start Frontend:

Navigate to chat-frontend
```bash npm run dev  ```

Contributing

We welcome contributions! If you'd like to contribute to the project, please follow these steps:

    Fork the repository.
    Create a new branch (git checkout -b feature-name).
    Make your changes.
    Commit your changes (git commit -am 'Add feature-name').
    Push to the branch (git push origin feature-name).
    Create a new Pull Request.
