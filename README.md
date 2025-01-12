# MSA_Server

# Multi-Service Blog Platform

This project is a multi-service blog platform built using Node.js, Express, PostgreSQL, and Docker. Each service is isolated and uses its own PostgreSQL schema to ensure separation of concerns.

## Features

1. **User Service**

   - Handles user authentication and profile management.
   - Passwords are securely stored using bcrypt.
   - Authentication is implemented using JWT.

2. **Blog Service**

   - Allows CRUD operations on blog posts.
   - Supports pagination for scalable post listing.

3. **Comment Service**

   - Enables users to add comments to blog posts.
   - Comments are stored in a flat structure, with potential for nesting.

4. **Database**
   - PostgreSQL is used to store data.
   - Separate schemas are defined for each service: `users_schema`, `blogs_schema`, and `comments_schema`.

---

## Prerequisites

- **Node.js** (v14 or higher)
- **Docker** (for running services and PostgreSQL)
- **PostgreSQL** (if running without Docker)

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd multi-service-blog
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=postgres://user:password@postgres:5432/blogdb
JWT_SECRET=your_secret_key
PORT=4000
```

Replace `user`, `password`, and `blogdb` with your PostgreSQL credentials and database name.

### 4. Start the Application

#### Using Docker Compose:

Ensure Docker is installed and running. Then, execute:

```bash
docker-compose up
```

This will start the application and PostgreSQL services.

#### Without Docker:

Ensure PostgreSQL is running, and update the `DATABASE_URL` in the `.env` file. Then run:

```bash
node index.js
```

---

## API Endpoints

### User Service

- **POST /register**: Register a new user.
  ```json
  {
    "username": "testuser",
    "password": "testpassword"
  }
  ```
- **POST /login**: Authenticate a user and receive a JWT.
  ```json
  {
    "username": "testuser",
    "password": "testpassword"
  }
  ```
- **GET /users/:id**: Retrieve user details (requires authentication).
- **PUT /users/:id**: Update user details (requires authentication).
- **DELETE /users/:id**: Delete a user (requires authentication).

### Blog Service

- **POST /blogs**: Create a new blog post (requires authentication).
  ```json
  {
    "title": "My First Blog Post",
    "content": "This is the content of the blog post."
  }
  ```
- **GET /blogs**: List all blog posts with pagination.
  ```
  /blogs?page=1&limit=10
  ```
- **GET /blogs/:id**: Fetch a specific blog post by ID.
- **PUT /blogs/:id**: Update a blog post (requires authentication).
- **DELETE /blogs/:id**: Delete a blog post (requires authentication).

### Comment Service

- **POST /comments**: Add a comment to a blog post (requires authentication).
  ```json
  {
    "postId": 1,
    "content": "This is a comment."
  }
  ```
- **GET /comments?post_id=:id**: List comments for a specific blog post.

---

## Database Setup

The application uses separate schemas for different services:

1. **User Schema** (`users_schema`):

   - `users` table: Stores user data.

2. **Blog Schema** (`blogs_schema`):

   - `blogs` table: Stores blog posts.

3. **Comment Schema** (`comments_schema`):
   - `comments` table: Stores comments for blog posts.

Ensure the database is initialized with these schemas. Use the following SQL commands to create schemas:

```sql
CREATE SCHEMA users_schema;
CREATE SCHEMA blogs_schema;
CREATE SCHEMA comments_schema;
```

---

## Testing

You can test the API endpoints using tools like Postman or cURL. Ensure you include the JWT token in the `Authorization` header for protected routes.

---

## Deployment

To deploy the application:

1. Ensure your PostgreSQL instance is accessible (e.g., AWS RDS, Azure Database).
2. Set environment variables for production in `.env`.
3. Use Docker or directly run the application with `node index.js`.

---
