# Discussion Thread System

A full-stack Discussion Thread System with nested comments functionality, similar to Reddit, GitHub, or Medium.

## 🚀 Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database with Mongoose ODM
- **TypeScript** - Type-safe JavaScript

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **React Router** - Client-side routing

## 📋 Features

- ✅ Create discussion posts
- ✅ View all posts
- ✅ View single post with comments
- ✅ Add comments to posts
- ✅ Reply to existing comments (nested comments)
- ✅ Visual indentation for nested comments
- ✅ "Replying to X" indicator
- ✅ Modern, responsive UI with dark theme

## 🗂️ Project Structure

```
project2/
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── posts/          # Posts module
│   │   │   ├── dto/
│   │   │   ├── schemas/
│   │   │   ├── posts.controller.ts
│   │   │   ├── posts.service.ts
│   │   │   └── posts.module.ts
│   │   ├── comments/       # Comments module
│   │   │   ├── dto/
│   │   │   ├── schemas/
│   │   │   ├── comments.controller.ts
│   │   │   ├── comments.service.ts
│   │   │   └── comments.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
│
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── api/           # API service layer
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── types/         # TypeScript interfaces
│   │   ├── App.tsx
│   │   └── index.css
│   └── package.json
│
└── README.md
```

## 🛠️ Prerequisites

- **Node.js** v18 or higher
- **MongoDB** running locally on port 27017
- **npm** package manager

## 📦 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd project2
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

## 🚀 Running the Application

### 1. Start MongoDB
Make sure MongoDB is running locally on port 27017:
```bash
mongod
```

### 2. Start Backend
```bash
cd backend
npm run start:dev
```
Backend will run on: http://localhost:3000

### 3. Start Frontend
```bash
cd frontend
npm run dev
```
Frontend will run on: http://localhost:5173

## 📡 API Endpoints

### Posts

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/posts` | Create a new post |
| GET | `/posts` | Get all posts |
| GET | `/posts/:id` | Get single post by ID |

### Comments

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/comments` | Create a comment (top-level or reply) |
| GET | `/comments/post/:postId` | Get nested comments tree for a post |

## 📊 Data Models

### Post
```typescript
{
  _id: ObjectId,
  title: string,
  content: string,
  createdAt: Date
}
```

### Comment
```typescript
{
  _id: ObjectId,
  postId: ObjectId,        // Reference to Post
  content: string,
  parentCommentId: ObjectId | null,  // null = top-level comment
  createdAt: Date,
  replies: Comment[]       // Nested replies (in API response)
}
```

## 🎨 UI Features

- **Dark Theme** - Modern dark gradient background
- **Glassmorphism** - Frosted glass effect on cards
- **Nested Comments** - Color-coded borders for each nesting level
- **Responsive Design** - Works on all screen sizes
- **Loading States** - Smooth loading animations
- **Error Handling** - User-friendly error messages

## 🔧 Configuration

### Backend MongoDB Connection
Edit `backend/src/app.module.ts` to change MongoDB connection string:
```typescript
MongooseModule.forRoot('mongodb://localhost:27017/discussion-thread')
```

### Frontend API URL
Edit `frontend/src/api/api.ts` to change API base URL:
```typescript
const API_BASE_URL = 'http://localhost:3000';
```

## 📝 License

MIT License
