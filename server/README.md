# Learning Management System (LMS)

## Project Title
Learning Management System (LMS)

## Project Description
The LMS is a full-stack application designed to manage online courses. It allows instructors to create and manage courses, lectures, and content, while students can enroll in courses, track their progress, and access course materials. The system includes user authentication, payment integration, and progress tracking.

## Requirements
- **Node.js**: v16.x or higher
- **MongoDB**: v5.x or higher
- **npm**: v8.x or higher
- **dotenv**: For environment variable management
- **Stripe**: For payment processing
- **Cloudinary**: For media uploads

## Setup and Installation Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/Chethantram/lms-Elearning.git
   cd lms
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following variables:
   ```env
   PORT=5000
   MONGO_URL=mongodb://localhost:27017/lms
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=http://localhost:5173

   # Cloudinary setup
   CLOUD_NAME=your_cloudinary_name
   API_KEY=your_cloudinary_api_key
   API_SECRET_KEY=your_cloudinary_api_secret

   # Stripe setup
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Start the client (navigate to the client directory):
   ```bash
   cd client
   npm install
   npm run dev
   ```

## API Base URL
`http://localhost:5000/api`

## API Routes Table

| HTTP Method | Route Path                                   | Purpose/Description                          | Auth Required | Request Body                          |
|-------------|---------------------------------------------|----------------------------------------------|---------------|---------------------------------------|
| POST        | /auth/register                              | Register a new user                          | No            | `{ name, email, password }`          |
| POST        | /auth/login                                 | Login and get a token                        | No            | `{ email, password }`                |
| GET         | /auth/logout                                | Logout the user                              | Yes           | None                                  |
| GET         | /user/profile                               | Get user profile                             | Yes           | None                                  |
| PUT         | /user/profile/update                        | Update user profile                          | Yes           | `{ name, photoUrl }`                 |
| POST        | /course/create                              | Create a new course                          | Yes           | `{ title, category }`                |
| GET         | /course/search                              | Search for courses                           | No            | `{ query, categories, sortByPrice }` |
| GET         | /course/published-course                   | Get all published courses                    | No            | None                                  |
| POST        | /purchase/checkout/create-checkout-session | Create a Stripe checkout session             | Yes           | `{ courseId }`                       |
| POST        | /purchase/webhook                           | Stripe webhook for payment events            | No            | Stripe webhook payload                |
| GET         | /progress/:courseId                        | Get course progress                          | Yes           | None                                  |
| POST        | /progress/:courseId/lecture/:lectureId/view| Mark a lecture as viewed                     | Yes           | None                                  |

## Request and Response Examples

### Register a User
**Request:**
```json
POST /auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account Created Successfully"
}
```

### Error Format
**Example:**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

## Authentication Details
- **JWT Tokens**: Used for authentication. Include the token in the `Authorization` header as `Bearer <token>`.
- **Cookies**: The server sets a `token` cookie for authenticated sessions.

## Environment Variables
- `PORT`: The port the server runs on.
- `MONGO_URL`: MongoDB connection string.
- `JWT_SECRET`: Secret key for signing JWT tokens.
- `FRONTEND_URL`: URL of the frontend application.
- `CLOUD_NAME`, `API_KEY`, `API_SECRET_KEY`: Cloudinary credentials for media uploads.
- `STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`: Stripe credentials for payment processing.
