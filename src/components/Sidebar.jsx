import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
    };

    return (
        <aside className="sidebar">

            <div className="sidebar-brand">

                <div className="sidebar-logo">
                    🎓
                </div>

                <div>
                    <h2>EduTrack</h2>
                    <span>Student Portal</span>
                </div>

            </div>

            <nav className="sidebar-nav">

                <p className="nav-title">
                    MAIN MENU
                </p>

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                    }
                >
                    <span>📊</span>
                    <span>Dashboard</span>
                </NavLink>


                <NavLink
                    to="/subjects"
                    className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                    }
                >
                    <span>📚</span>
                    <span>My Subjects</span>
                </NavLink>


                <NavLink
                    to="/attendance"
                    className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                    }
                >
                    <span>📈</span>
                    <span>Attendance</span>
                </NavLink>


                <p className="nav-title second-title">
                    ACCOUNT
                </p>


                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                    }
                >
                   <span>👤</span>
                    <span>My Profile</span>
                </NavLink>


                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                    }
                >
                    <span>⚙️</span>
                    <span>Settings</span>
                </NavLink>

            </nav>

            <div className="sidebar-bottom">

                <div className="help-box">

                    <div className="help-icon">
                        💡
                    </div>

                    <div>
                        <strong>Need help?</strong>
                        <p>Contact administration</p>
                    </div>

                </div>


                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    <span>↪</span>
                    Logout
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;