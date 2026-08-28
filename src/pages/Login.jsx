import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        const savedStudent = localStorage.getItem("student");

        if (!savedStudent) {
            setError("No student account found. Please create an account first.");
            return;
        }

        const student = JSON.parse(savedStudent);

        if (
            student.email === email &&
            student.password === password
        ) {
            localStorage.setItem("isLoggedIn", "true");

            navigate("/dashboard");
        } else {
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-left">

                <div className="brand">
                    <div className="brand-icon">
                        🎓
                    </div>

                    <span>EduTrack</span>
                </div>

                <div className="hero-content">

                    <span className="hero-badge">
                        STUDENT PORTAL
                    </span>

                    <h1>
                        Manage your
                        <span> academic journey.</span>
                    </h1>

                    <p>
                        Track your subjects, monitor attendance,
                        and stay organized throughout your semester.
                    </p>

                    <div className="feature-list">

                        <div className="feature-item">
                            <div className="feature-icon">📚</div>

                            <div>
                                <h4>Manage Subjects</h4>
                                <p>Keep track of your selected courses.</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon">📊</div>

                            <div>
                                <h4>Track Attendance</h4>
                                <p>Monitor your attendance in real time.</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon">🎯</div>

                            <div>
                                <h4>Stay On Track</h4>
                                <p>Keep your academic goals organized.</p>
                            </div>
                        </div>

                    </div>

                </div>

                <div className="copyright">
                    © 2026 EduTrack Student Portal
                </div>

            </div>

            <div className="auth-right">

                <div className="login-card">

                    <div className="mobile-brand">
                        <div className="brand-icon">
                            🎓
                        </div>

                        <span>EduTrack</span>
                    </div>

                    <div className="login-heading">

                        <span className="small-title">
                            WELCOME BACK
                        </span>

                        <h2>
                            Sign in to your account
                        </h2>

                        <p>
                            Enter your credentials to access your
                            student dashboard.
                        </p>

                    </div>


                    {error && (
                        <div className="error-message">
                            ⚠️ {error}
                        </div>
                    )}


                    <form onSubmit={handleLogin}>

                        <div className="form-group">

                            <label>Email Address</label>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    ✉
                                </span>

                                <input
                                    type="email"
                                    placeholder="student@example.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />

                            </div>

                        </div>

                        <div className="form-group">

                            <div className="password-label">

                                <label>Password</label>

                                <a href="#forgot">
                                    Forgot password?
                                </a>

                            </div>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    🔒
                                </span>

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? "🙈" : "👁"}
                                </button>

                            </div>

                        </div>

                        <div className="remember-row">

                            <label className="remember">

                                <input type="checkbox" />

                                <span>
                                    Remember me
                                </span>

                            </label>

                        </div>

                        <button
                            type="submit"
                            className="login-button"
                        >
                            <span>Sign In</span>
                            <span className="arrow">
                                →
                            </span>
                        </button>

                    </form>

                    <div className="signup-link">

                        <span>
                            Don't have an account?
                        </span>

                        <Link to="/signup">
                            Create account
                        </Link>

                    </div>

                    <div className="demo-info">

                        <span>💡</span>

                        <p>
                            Create an account first to access
                            your student dashboard.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;