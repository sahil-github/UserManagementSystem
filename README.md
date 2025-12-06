# User Management System - MERN Stack Application

A full-stack web application for managing users with CRUD operations, email notifications, and analytics dashboard. Built with MongoDB, Express.js, React, and Node.js.

##  Features

### User Management
-  Create new users with detailed information
-  View all users in a responsive table
-  Edit existing user details
-  Delete users with confirmation dialog
-  Form validation on both frontend and backend

### Email Notifications
-  Send personalized email notifications to selected users
-  Customizable email subject and message
-  HTML email templates
-  Bulk email sending capability
-  Success/error feedback for email delivery

### Analytics Dashboard
-  Total user count statistics
-  Users grouped by country with visual charts
-  Top 10 states by user distribution
-  Top 10 cities by user distribution
-  Interactive bar charts for data visualization

##  Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Nodemailer** - Email sending service
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool and development server
- **Context API** - State management
- **CSS3** - Styling







##  API Endpoints

### User Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Notification Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/notifications/send` | Send email notifications |

### Analytics Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/users-by-location` | Get location-based analytics |

e
##  Features Walkthrough

### 1. Dashboard
- View total user count
- See distribution by country, state, and city
- Visual bar charts for easy data interpretation

### 2. User Management
- **Add User**: Navigate to "Add User" and fill in the form
- **View Users**: See all users in a clean table format
- **Edit User**: Click "Edit" button on any user
- **Delete User**: Click "Delete" with confirmation dialog

### 3. Send Notifications
- Select users from the list (checkbox selection)
- Compose your email with subject and message
- Send to all selected users at once
- Get instant feedback on delivery status

##  Security Features

- Email validation on both client and server
- Phone number validation
- MongoDB injection prevention with Mongoose
- Error handling middleware
- CORS configuration for secure cross-origin requests








### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature

# Commit changes
git add .
git commit -m "Add: your feature description"

# Push to remote
git push origin feature/your-feature
```
