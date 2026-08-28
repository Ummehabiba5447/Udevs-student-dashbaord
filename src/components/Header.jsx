function Header() {

    const student = JSON.parse(
        localStorage.getItem("student")
    );

    return (
        <header className="dashboard-header">

            <div className="header-left">

                <div className="mobile-menu">
                    ☰
                </div>

                <div>
                    <p className="header-small">
                        STUDENT PORTAL
                    </p>

                    <h1>
                        Dashboard
                    </h1>
                </div>

            </div>


            <div className="header-right">

                <button className="notification-button">
                    🔔
                    <span></span>
                </button>


                <div className="header-profile">

                    <div className="profile-avatar">
                        {student?.name
                            ? student.name.charAt(0).toUpperCase()
                            : "S"}
                    </div>

                    <div className="header-student">

                        <strong>
                            {student?.name || "Student"}
                        </strong>

                        <span>
                            {student?.studentId || "Student ID"}
                        </span>

                    </div>

                    <span className="profile-arrow">
                        ▾
                    </span>

                </div>

            </div>

        </header>
    );
}

export default Header;