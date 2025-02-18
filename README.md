# Blog Application

## Overview
This is a simple **Blog Application** that allows users to view, create, edit, and delete blog posts. The application is built using React, TypeScript, and a RESTful API backend.

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/jawariawaseemsystems/blog-app
cd blog-app
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the root directory and add:
```sh
REACT_APP_API_URL=http://localhost:3001
```

### 4️⃣ Start the Development Server
```sh
npm start
```
This runs the app in development mode at `http://localhost:3000/`.

## API Endpoints
| Method | Endpoint                         | Description        |
|--------|----------------------------------|--------------------|
| GET    | `/users/{userId}/posts`         | Fetch user posts  |
| GET    | `/users/{userId}`               | Fetch users  |
| GET    | `/posts/{postId}`               | Fetch post details|
| PUT    | `/edit/post`                    | Update a post     |

