import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Dashboard() {

    const student = JSON.parse(
        localStorage.getItem("student")
    );

    const subjects = [
        {
            name: "Web Development",
            code: "IT-301",
            instructor: "Dr. Sarah Ahmed",
            attended: 27,
            total: 30,
            color: "blue",
            icon: "💻"
        },
        {
            name: "Database Systems",
            code: "IT-302",
            instructor: "Mr. Hassan Ali",
            attended: 23,
            total: 28,
            color: "purple",
            icon: "🗄️"
        },
        {
            name: "Software Engineering",
            code: "SE-305",
            instructor: "Dr. Ayesha Khan",
            attended: 29,
            total: 32,
            color: "green",
            icon: "⚙️"
        },
        {
            name: "Artificial Intelligence",
            code: "AI-401",
            instructor: "Dr. Hamza Malik",
            attended: 20,
            total: 25,
            color: "orange",
            icon: "🤖"
        }
    ];


    const calculatePercentage = (attended, total) => {
        return Math.round(
            (attended / total) * 100
        );
    };


    const overallAttended = subjects.reduce(
        (sum, subject) =>
            sum + subject.attended,
        0
    );


    const overallTotal = subjects.reduce(
        (sum, subject) =>
            sum + subject.total,
        0
    );


    const overallAttendance =
        Math.round(
            (overallAttended / overallTotal) * 100
        );


    return (
        <div className="dashboard-layout">

            <Sidebar />

            <main className="dashboard-main">

                <Header />


                <div className="dashboard-content">

                    <section className="welcome-card">

                        <div>

                            <span>
                                GOOD MORNING 👋
                            </span>

                            <h2>
                                Welcome back,{" "}
                                {student?.name || "Student"}!
                            </h2>

                            <p>
                                Here's an overview of your
                                academic progress this semester.
                            </p>

                        </div>


                        <div className="welcome-illustration">
                            🎓
                        </div>

                    </section>

                    <section className="stats-grid">

                        <div className="stat-card">

                            <div className="stat-icon blue-icon">
                                📚
                            </div>

                            <div>
                                <span>
                                    SELECTED SUBJECTS
                                </span>

                                <h3>
                                    {subjects.length}
                                </h3>

                                <p>
                                    This semester
                                </p>
                            </div>

                        </div>


                        <div className="stat-card">

                            <div className="stat-icon green-icon">
                                📈
                            </div>

                            <div>
                                <span>
                                    OVERALL ATTENDANCE
                                </span>

                                <h3>
                                    {overallAttendance}%
                                </h3>

                                <p className="positive">
                                    ● Good attendance
                                </p>
                            </div>

                        </div>


                        <div className="stat-card">

                            <div className="stat-icon purple-icon">
                                ✓
                            </div>

                            <div>
                                <span>
                                    CLASSES ATTENDED
                                </span>

                                <h3>
                                    {overallAttended}
                                </h3>

                                <p>
                                    Out of {overallTotal}
                                </p>
                            </div>

                        </div>


                        <div className="stat-card">

                            <div className="stat-icon orange-icon">
                                🎯
                            </div>

                            <div>
                                <span>
                                    ATTENDANCE GOAL
                                </span>

                                <h3>
                                    85%
                                </h3>

                                <p>
                                    Target percentage
                                </p>
                            </div>

                        </div>

                    </section>

                    <div className="dashboard-grid">

                        <section className="dashboard-section">

                            <div className="section-heading">

                                <div>
                                    <span>
                                        ACADEMIC
                                    </span>

                                    <h2>
                                        My Subjects
                                    </h2>
                                </div>

                                <Link to="/subjects">
                                    View all →
                                </Link>

                            </div>


                            <div className="subject-list">

                                {subjects.map(
                                    (subject, index) => {

                                        const percentage =
                                            calculatePercentage(
                                                subject.attended,
                                                subject.total
                                            );

                                        return (

                                            <div
                                                className="subject-row"
                                                key={index}
                                            >

                                                <div
                                                    className={`subject-icon ${subject.color}`}
                                                >
                                                    {subject.icon}
                                                </div>


                                                <div className="subject-info">

                                                    <h3>
                                                        {subject.name}
                                                    </h3>

                                                    <span>
                                                        {subject.code} •{" "}
                                                        {subject.instructor}
                                                    </span>

                                                </div>


                                                <div className="subject-attendance">

                                                    <div className="attendance-number">
                                                        {percentage}%
                                                    </div>

                                                    <div className="progress-track">

                                                        <div
                                                            className={`progress-fill ${subject.color}`}
                                                            style={{
                                                                width: `${percentage}%`
                                                            }}
                                                        ></div>

                                                    </div>

                                                    <span>
                                                        {subject.attended}/
                                                        {subject.total} classes
                                                    </span>

                                                </div>

                                            </div>

                                        );
                                    }
                                )}

                            </div>

                        </section>

                        <section className="attendance-overview">

                            <div className="section-heading">

                                <div>
                                    <span>
                                        ATTENDANCE
                                    </span>

                                    <h2>
                                        Overview
                                    </h2>
                                </div>

                            </div>


                            <div className="attendance-circle">

                                <div
                                    className="circle-progress"
                                    style={{
                                        background:
                                            `conic-gradient(
                                                #4b8df8 ${overallAttendance * 3.6}deg,
                                                #edf1f7 0deg
                                            )`
                                    }}
                                >

                                    <div className="circle-inner">

                                        <strong>
                                            {overallAttendance}%
                                        </strong>

                                        <span>
                                            Overall
                                        </span>

                                    </div>

                                </div>

                            </div>


                            <div className="attendance-message">

                                <div className="message-icon">
                                    ✓
                                </div>

                                <div>

                                    <strong>
                                        You're doing great!
                                    </strong>

                                    <p>
                                        Your attendance is above
                                        the recommended 75%.
                                    </p>

                                </div>

                            </div>


                            <Link
                                to="/attendance"
                                className="attendance-button"
                            >
                                View Attendance Details
                                <span>→</span>
                            </Link>

                        </section>

                    </div>

                    <section className="quick-actions">

                        <div>
                            <span>
                                QUICK ACTIONS
                            </span>

                            <h2>
                                Manage your academics
                            </h2>
                        </div>


                        <div className="action-buttons">

                            <Link
                                to="/subjects"
                                className="quick-action"
                            >
                                <span>📚</span>
                                <div>
                                    <strong>
                                        My Subjects
                                    </strong>

                                    <small>
                                        Manage courses
                                    </small>
                                </div>
                            </Link>


                            <Link
                                to="/attendance"
                                className="quick-action"
                            >
                                <span>📊</span>

                                <div>
                                    <strong>
                                        Attendance
                                    </strong>

                                    <small>
                                        View statistics
                                    </small>
                                </div>
                            </Link>


                            <Link
                                to="/profile"
                                className="quick-action"
                            >
                                <span>👤</span>

                                <div>
                                    <strong>
                                        My Profile
                                    </strong>

                                    <small>
                                        View information
                                    </small>
                                </div>
                            </Link>

                        </div>

                    </section>

                </div>

            </main>

        </div>
    );
}

export default Dashboard;