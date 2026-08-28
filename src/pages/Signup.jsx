import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        studentId: "",
        department: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setError("");
    };

    const handleSignup = (e) => {
        e.preventDefault();

        const {
            name,
            email,
            studentId,
            department,
            password,
            confirmPassword,
        } = formData;

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        const existingStudent = localStorage.getItem("student");

        if (existingStudent) {
            const student = JSON.parse(existingStudent);

            if (student.email === email) {
                setError("An account with this email already exists.");
                return;
            }
        }

        const studentData = {
            name,
            email,
            studentId,
            department,
            password,
            subjects: [],
            attendance: [],
            createdAt: new Date().toISOString(),
        };

        localStorage.setItem(
            "student",
            JSON.stringify(studentData)
        );

        navigate("/login");
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
                        JOIN EDU TRACK
                    </span>

                    <h1>
                        Start your
                        <span> academic journey.</span>
                    </h1>

                    <p>
                        Create your student account and get access
                        to your personalized academic dashboard.
                    </p>


                    <div className="feature-list">

                        <div className="feature-item">

                            <div className="feature-icon">
                                👤
                            </div>

                            <div>
                                <h4>Personal Profile</h4>

                                <p>
                                    Keep your student information organized.
                                </p>
                            </div>

                        </div>


                        <div className="feature-item">

                            <div className="feature-icon">
                                📚
                            </div>

                            <div>
                                <h4>Select Subjects</h4>

                                <p>
                                    Choose the subjects you are studying.
                                </p>
                            </div>

                        </div>


                        <div className="feature-item">

                            <div className="feature-icon">
                                📈
                            </div>

                            <div>
                                <h4>Monitor Progress</h4>

                                <p>
                                    Keep track of your academic attendance.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>


                <div className="copyright">
                    © 2026 EduTrack Student Portal
                </div>

            </div>

            <div className="auth-right">

                <div className="login-card signup-card">

                    <div className="mobile-brand">

                        <div className="brand-icon">
                            🎓
                        </div>

                        <span>EduTrack</span>

                    </div>

                    <div className="login-heading">

                        <span className="small-title">
                            CREATE ACCOUNT
                        </span>

                        <h2>
                            Create your student account
                        </h2>

                        <p>
                            Fill in your details to get started
                            with EduTrack.
                        </p>

                    </div>

                    {error && (
                        <div className="error-message">
                            ⚠️ {error}
                        </div>
                    )}


                    <form onSubmit={handleSignup}>

                        <div className="form-row">

                            <div className="form-group">

                                <label>
                                    Full Name
                                </label>

                                <div className="input-wrapper">

                                    <span className="input-icon">
                                        👤
                                    </span>

                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>


                            <div className="form-group">

                                <label>
                                    Student ID
                                </label>

                                <div className="input-wrapper">

                                    <span className="input-icon">
                                        🎓
                                    </span>

                                    <input
                                        type="text"
                                        name="studentId"
                                        placeholder="e.g. FA22-BIT-001"
                                        value={formData.studentId}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>

                        </div>

                        <div className="form-group">

                            <label>
                                Email Address
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    ✉
                                </span>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="student@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        <div className="form-group">

                            <label>
                                Department
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    🏫
                                </span>

                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select your department
                                    </option>

                                    <option value="Information Technology">
                                        Information Technology
                                    </option>

                                    <option value="Computer Science">
                                        Computer Science
                                    </option>

                                    <option value="Software Engineering">
                                        Software Engineering
                                    </option>

                                    <option value="Artificial Intelligence">
                                        Artificial Intelligence
                                    </option>

                                    <option value="Data Science">
                                        Data Science
                                    </option>

                                </select>

                            </div>

                        </div>

                        <div className="form-row">

                            <div className="form-group">

                                <label>
                                    Password
                                </label>

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
                                        name="password"
                                        placeholder="Minimum 6 characters"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                    >
                                        {showPassword
                                            ? "🙈"
                                            : "👁"}
                                    </button>

                                </div>

                            </div>

                            <div className="form-group">

                                <label>
                                    Confirm Password
                                </label>

                                <div className="input-wrapper">

                                    <span className="input-icon">
                                        🔐
                                    </span>

                                    <input
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="confirmPassword"
                                        placeholder="Repeat password"
                                        value={
                                            formData.confirmPassword
                                        }
                                        onChange={handleChange}
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                    >
                                        {showConfirmPassword
                                            ? "🙈"
                                            : "👁"}
                                    </button>

                                </div>

                            </div>

                        </div>

                        <label className="terms">

                            <input
                                type="checkbox"
                                required
                            />

                            <span>
                                I agree to the student portal
                                terms and conditions.
                            </span>

                        </label>

                        <button
                            type="submit"
                            className="login-button"
                        >

                            <span>
                                Create Account
                            </span>

                            <span className="arrow">
                                →
                            </span>

                        </button>

                    </form>

                    <div className="signup-link">

                        <span>
                            Already have an account?
                        </span>

                        <Link to="/login">
                            Sign in
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Signup;