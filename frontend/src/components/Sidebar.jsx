import { useNavigate } from 'react-router-dom';

import "../css/sidebar.css";
import { logout } from "../api/User";
import logo from "../assets/logo.png";

export const Sidebar = () => {

    const navigate = useNavigate();

    return (
        <div className="s-layout__sidebar">
            <span className="s-sidebar__trigger"> <i className="fa fa-bars"></i> </span>

            <nav className="s-sidebar__nav">
                <div className="s-sidebar__brand" onClick={() => navigate("/dashboard")}>
                    <img src={logo} alt="QuizApp" className="s-sidebar__logo" />
                    <span className="s-sidebar__brand-name">QuizApp</span>
                </div>
                <ul>
                    <li>
                        <span className="s-sidebar__nav-link" onClick={() => navigate("/dashboard")}>
                            <i className="fa fa-home"></i><em>Home</em>
                        </span>
                    </li>
                    <li>
                        <span className="s-sidebar__nav-link" onClick={() => navigate("/dashboard/edituser")}>
                            <i className="fa fa-user"></i><em>Update Detail</em>
                        </span>
                    </li>
                    <li>
                        <span className="s-sidebar__nav-link" onClick={() => navigate("/dashboard/changepassword")}>
                            <i className="fa fa-edit"></i><em>Change Password</em>
                        </span>
                    </li>
                    <li>
                        <span className="s-sidebar__nav-link" onClick={() => navigate("/dashboard/quiz")}>
                            <i className="fa fa-list"></i><em>Quiz</em>
                        </span>
                    </li>
                    <li>
                        <span className="s-sidebar__nav-link" onClick={() => navigate("/dashboard/publicquiz")}>
                            <i className="fa fa-list"></i><em>Exam</em>
                        </span>
                    </li>
                    <li>
                        <span className="s-sidebar__nav-link" onClick={() => navigate("/dashboard/report")}>
                            <i className="fa fa-list"></i><em>Report</em>
                        </span>
                    </li>
                    <li>
                        <span className="s-sidebar__nav-link" onClick={() => { navigate("/login"); logout() }}>
                            <i className="fa fa-sign-out"></i><em>Logout</em>
                        </span>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
