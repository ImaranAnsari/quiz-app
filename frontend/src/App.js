import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import './css/global.css';
import { Home } from "./pages/Home";
import { RegisterUser } from "./pages/RegisterUser";
import { Login } from "./pages/Login";
import { EditUser } from "./pages/EditUser";
import { ChangePassword } from "./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import { Quiz } from "./pages/quiz/Quiz";
import { AddQuiz } from "../src/components/quiz/AddQuiz";
import { EditQuiz } from "./pages/quiz/EditQuiz";
import PublishedQuiz from "./pages/exam/PublishedQuiz";
import Exam from "./pages/exam/Exam";
import SubmitExam from "./pages/exam/SubmitExam";
import Report from "./pages/exam/Report";
import Sidebar from "./components/Sidebar";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Dashboard shell: sidebar + content area
const DashboardLayout = () => (
  <div className="dashboard-layout">
    <Sidebar />
    <div className="dashboard-content">
      <Outlet />
    </div>
  </div>
);

// 404 page
const NotFound = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    gap: 'var(--space-lg)',
    textAlign: 'center',
    padding: 'var(--space-xl)',
  }}>
    <div style={{ fontSize: '5rem', lineHeight: 1 }}>🔍</div>
    <h1 style={{ fontSize: '2rem', margin: 0 }}>Page Not Found</h1>
    <p style={{ color: 'var(--color-text-secondary)' }}>
      The page you're looking for doesn't exist.
    </p>
    <a href="/" className="btn" style={{ textDecoration: 'none' }}>
      Go Home
    </a>
  </div>
);

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/register",
      element: <RegisterUser />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "edituser", element: <EditUser /> },
        { path: "changepassword", element: <ChangePassword /> },
        { path: "quiz", element: <Quiz /> },
        { path: "addquiz", element: <AddQuiz /> },
        { path: "editquiz", element: <EditQuiz /> },
        { path: "publicquiz", element: <PublishedQuiz /> },
        { path: "startexam", element: <Exam /> },
        { path: "submit-exam", element: <SubmitExam /> },
        { path: "report", element: <Report /> },
      ]
    },
    {
      path: "*",
      element: <NotFound />
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
