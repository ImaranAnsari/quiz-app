# QuizApp

QuizApp is a full-stack, comprehensive web application built with the MERN stack (MongoDB, Express.js, React, Node.js). It provides a sleek, modern platform for users to create, manage, and take quizzes, as well as view their performance reports.

![QuizApp Home](frontend/public/logo512.png)

## Features

* **User Authentication:** Secure registration and login using JWT (JSON Web Tokens) and bcrypt for password hashing.
* **Modern UI/UX:** A beautifully designed interface using vanilla CSS and a custom design system featuring glassmorphism, responsive grid/flex layouts, gradient accents, and a persistent dashboard layout.
* **Dashboard Management:** An authenticated space for managing your profile details, changing passwords, and accessing app features easily through a sleek sidebar.
* **Quiz Management:** Authenticated users can Create, Edit, Publish, and Delete quizzes. Designed to support robust quiz configuration.
* **Take Exams:** Users can take published public quizzes, answering interactive questions and tracking their progress natively.
* **Reports:** Comprehensive reporting on completed exams to track your learning journey over time.

## Tech Stack

### Frontend
* **React 18:** Built with `create-react-app`.
* **React Router v6:** Provides seamless nested routing and layout architecture (like the Dashboard).
* **Axios:** Handles API requests to the backend.
* **Bootstrap 5:** Utility classes and some foundational component styling, enhanced extensively with custom vanilla CSS.

### Backend
* **Node.js & Express.js:** The core server providing robust RESTful APIs.
* **TypeScript:** The backend is fully written in TypeScript for type safety and superior DX.
* **MongoDB & Mongoose:** Handles document-based data storage and object modeling.
* **JWT (jsonwebtoken):** Secures all authenticated routes.
* **Jest:** Configured for backend testing.
* **Nodemailer:** Prepared for sending emails (e.g., account notifications).

## Getting Started

### Prerequisites
* Node.js (v16+ recommended)
* Yarn or npm
* MongoDB instance (Local or Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd quiz-app
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   yarn install
   # or
   npm install
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   yarn install
   # or
   npm install
   ```

### Running the Application Local

To run the application locally, you will need to start both the backend and frontend servers.

1. **Start the Backend server (Development):**
   ```bash
   cd backend
   yarn start:dev
   # or
   npm run start:dev
   ```
   *The backend server will run on the configured port using `nodemon`.*

2. **Start the Frontend development server:**
   ```bash
   cd frontend
   yarn start
   # or
   npm start
   ```
   *The React app will launch in your default browser at `http://localhost:3000`.*

---

## Author
Developed by Imran Ansari