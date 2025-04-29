# Learning Management System (LMS)

## Project Title
Learning Management System (E-Learning) (LMS)

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
   3. Set up environment variables:
      - Create a `.env` file in the root directory.
      - Add the following variables:
        ```env
        PORT=3000
        MONGO_URI=your_mongodb_connection_string
        STRIPE_SECRET_KEY=your_stripe_secret_key
        CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
        CLOUDINARY_API_KEY=your_cloudinary_api_key
        CLOUDINARY_API_SECRET=your_cloudinary_api_secret
        ```

   4. Start the development server:
      ```bash
      npm run dev
      ```

   5. Access the application:
      - Open your browser and navigate to `http://localhost:3000`.

   ## Features
   - User authentication and authorization
   - Course creation and management
   - Student enrollment and progress tracking
   - Payment integration with Stripe
   - Media uploads with Cloudinary
   - Responsive design for mobile and desktop
