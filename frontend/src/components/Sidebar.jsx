import { useNavigate, useLocation } from 'react-router-dom';
import '../css/global.css';
import { logout } from '../api/User';
import logo from '../assets/logo.png';
import { LayoutDashboard, List, GraduationCap, BarChart2, Settings, LogOut } from 'lucide-react';

const navLinks = [
    { label: 'Dashboard',    Icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Quizzes',      Icon: List,            path: '/dashboard/quiz' },
    { label: 'Public Exams', Icon: GraduationCap,   path: '/dashboard/publicquiz' },
    { label: 'Results',      Icon: BarChart2,        path: '/dashboard/report' },
    { label: 'Settings',     Icon: Settings,         path: '/dashboard/edituser' },
];

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/dashboard') return location.pathname === '/dashboard';
        return location.pathname.startsWith(path);
    };

    return (
        <aside className="sidebar">
            <img src={logo} alt="QuizApp" className="sidebar__logo" />
            <div className="sidebar__brand">QuizApp</div>
            <nav className="sidebar__nav">
                {navLinks.map(({ label, Icon, path }) => (
                    <div
                        key={label}
                        id={`nav-${label.toLowerCase().replace(/\s+/g, '-')}`}
                        className={`sidebar__nav-link${isActive(path) ? ' active' : ''}`}
                        onClick={() => navigate(path)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => e.key === 'Enter' && navigate(path)}
                    >
                        <Icon size={18} strokeWidth={2} />
                        <span>{label}</span>
                    </div>
                ))}
                <div
                    id="nav-logout"
                    className="sidebar__nav-link"
                    onClick={() => { logout(); navigate('/login'); }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && (logout(), navigate('/login'))}
                >
                    <LogOut size={18} strokeWidth={2} />
                    <span>Logout</span>
                </div>
            </nav>
            <div className="sidebar__footer">Quiz Manager © 2026</div>
        </aside>
    );
};

export default Sidebar;
