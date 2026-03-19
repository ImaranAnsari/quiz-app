import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import './css/App.css';
import { Home } from "./pages/Home";
import { RegisterUser } from "./pages/RegisterUser";
import { Login } from "./pages/Login";
import { EditUser } from "./pages/EditUser";
import { ChangePassword } from "./pages/ChangePassword";
import { Dashboard } from "./pages/Dashboard";
import { Quiz } from "./pages/quiz/Quiz";
import { AddQuiz } from "./components/quiz/AddQuiz";
import { EditQuiz } from "./pages/quiz/EditQuiz";
import PublishedQuiz from "./pages/exam/PublishedQuiz";
import Exam from "./pages/exam/Exam";
import SubmitExam from "./pages/exam/SubmitExam";
import Report from "./pages/exam/Report";
import { Sidebar } from "./components/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';

const DashboardLayout = () => (
  <div className="dashboard-layout">
    <Sidebar />
    <main className="dashboard-content">
      <Outlet />
    </main>
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
      element: <DashboardLayout />,
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
      element: <div>Page not found</div>
    },
  ]);

  return <div className="App">
    <RouterProvider router={(router)} />
  </div>
}

export default App;
