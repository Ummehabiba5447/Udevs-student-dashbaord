import { useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import {
    getSubjects,
    createSubject,
    updateSubject,
    deleteSubject
} from "../utils/subjectStorage";


// ==========================================
// EMPTY FORM
// ==========================================

const emptyForm = {
    courseCode: "",
    subjectName: "",
    instructor: "",
    creditHours: "3",
    semester: "",
    department: "",
    section: "",
    room: "",
    schedule: "",
    time: "",
    capacity: "40"
};


// ==========================================
// SUBJECTS COMPONENT
// ==========================================

function Subjects() {

    // Load subjects from localStorage
    const [subjects, setSubjects] = useState(() => {
        return getSubjects();
    });

    // Form data
    const [formData, setFormData] = useState({
        ...emptyForm
    });

    // Course code currently being edited
    const [editingCode, setEditingCode] = useState(null);

    // Success / error message
    const [message, setMessage] = useState("");

    // Search
    const [search, setSearch] = useState("");


    // ==========================================
    // HANDLE INPUT CHANGE
    // ==========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };


    // ==========================================
    // RESET FORM
    // ==========================================

    const resetForm = () => {

        setFormData({
            ...emptyForm
        });

        setEditingCode(null);
    };


    // ==========================================
    // ADD / UPDATE SUBJECT
    // ==========================================

    const handleSubmit = (e) => {

        e.preventDefault();

        let result;


        if (editingCode) {

            result = updateSubject(
                editingCode,
                formData
            );

        } else {

            result = createSubject(
                formData
            );
        }


        setMessage(
            result?.message || ""
        );


        if (result?.success) {

            // Refresh subjects
            setSubjects(
                getSubjects()
            );

            // Clear form
            resetForm();


            // Remove message after 3 seconds
            setTimeout(() => {
                setMessage("");
            }, 3000);
        }
    };


    // ==========================================
    // EDIT SUBJECT
    // ==========================================

    const handleEdit = (subject) => {

        setFormData({
            courseCode: subject.courseCode || "",
            subjectName: subject.subjectName || "",
            instructor: subject.instructor || "",
            creditHours: subject.creditHours || "3",
            semester: subject.semester || "",
            department: subject.department || "",
            section: subject.section || "",
            room: subject.room || "",
            schedule: subject.schedule || "",
            time: subject.time || "",
            capacity: subject.capacity || "40"
        });


        setEditingCode(
            subject.courseCode
        );


        setMessage("");


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // ==========================================
    // CANCEL EDIT
    // ==========================================

    const handleCancel = () => {

        resetForm();

        setMessage("");
    };


    // ==========================================
    // DELETE SUBJECT
    // ==========================================

    const handleDelete = (courseCode) => {

        const confirmed = window.confirm(
            `Are you sure you want to delete ${courseCode}?`
        );


        if (!confirmed) {
            return;
        }


        const result =
            deleteSubject(courseCode);


        setMessage(
            result?.message || ""
        );


        if (result?.success) {

            setSubjects(
                getSubjects()
            );


            if (editingCode === courseCode) {
                resetForm();
            }


            setTimeout(() => {
                setMessage("");
            }, 3000);
        }
    };


    // ==========================================
    // SEARCH
    // ==========================================

    const searchText =
        search.toLowerCase().trim();


    const filteredSubjects =
        Object.values(subjects || {}).filter(
            (subject) => {

                return (
                    String(
                        subject.courseCode || ""
                    )
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    String(
                        subject.subjectName || ""
                    )
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    String(
                        subject.instructor || ""
                    )
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    String(
                        subject.department || ""
                    )
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    String(
                        subject.semester || ""
                    )
                        .toLowerCase()
                        .includes(searchText)
                );
            }
        );


    // ==========================================
    // TOTAL CREDIT HOURS
    // ==========================================

    const totalCreditHours =
        filteredSubjects.reduce(
            (total, subject) => {

                return (
                    total +
                    Number(
                        subject.creditHours || 0
                    )
                );
            },
            0
        );


    // ==========================================
    // RETURN
    // ==========================================

    return (

        <div className="dashboard-layout">

            {/* SIDEBAR */}
            <Sidebar />


            <main className="dashboard-main">

                {/* HEADER */}
                <Header />


                <div className="dashboard-content">


                    {/* ==================================
                        PAGE TITLE
                    ================================== */}

                    <div className="page-title">

                        <div>

                            <span>
                                ACADEMIC MANAGEMENT
                            </span>

                            <h2>
                                Subjects
                            </h2>

                            <p>
                                Create, view, update and manage
                                your academic courses.
                            </p>

                        </div>


                        <div
                            style={{
                                display: "flex",
                                gap: "15px"
                            }}
                        >

                            {/* SUBJECT COUNT */}

                            <div className="selected-count">

                                <strong>
                                    {filteredSubjects.length}
                                </strong>

                                <span>
                                    Subjects
                                </span>

                            </div>


                            {/* CREDIT HOURS */}

                            <div className="selected-count">

                                <strong>
                                    {totalCreditHours}
                                </strong>

                                <span>
                                    Credit Hours
                                </span>

                            </div>

                        </div>

                    </div>



                    {/* ==================================
                        MESSAGE
                    ================================== */}

                    {message && (

                        <div
                            style={{
                                padding: "14px 18px",
                                marginBottom: "20px",
                                borderRadius: "10px",
                                backgroundColor: "#e9f8ef",
                                color: "#198754",
                                fontWeight: "600"
                            }}
                        >

                            ✓ {message}

                        </div>

                    )}



                    {/* ==================================
                        SUBJECT FORM
                    ================================== */}

                    <div className="subject-form-card">


                        {/* FORM HEADER */}

                        <div className="subject-form-header">

                            <div className="form-header-icon">

                                {editingCode
                                    ? "✏️"
                                    : "📚"
                                }

                            </div>


                            <div className="form-header-content">

                                <span>

                                    {editingCode
                                        ? "COURSE MANAGEMENT"
                                        : "ACADEMIC MANAGEMENT"
                                    }

                                </span>


                                <h2>

                                    {editingCode
                                        ? "Update Subject"
                                        : "Add New Subject"
                                    }

                                </h2>


                                <p>

                                    {editingCode
                                        ? "Update the information of your selected course."
                                        : "Enter the details below to add a new course to your subjects."
                                    }

                                </p>

                            </div>

                        </div>



                        {/* FORM */}

                        <form onSubmit={handleSubmit}>


                            {/* ==================================
                                SECTION 01 - BASIC INFORMATION
                            ================================== */}

                            <div className="form-section">

                                <div className="form-section-title">

                                    <div className="section-number">
                                        01
                                    </div>

                                    <div>

                                        <h3>
                                            Basic Information
                                        </h3>

                                        <p>
                                            Enter the main details of the subject
                                        </p>

                                    </div>

                                </div>


                                <div className="beautiful-form-grid">


                                    {/* COURSE CODE */}

                                    <div className="beautiful-input-group">

                                        <label>
                                            Course Code
                                            <span>*</span>
                                        </label>

                                        <div className="input-wrapper">

                                            <span className="input-icon">
                                                #
                                            </span>

                                            <input
                                                type="text"
                                                name="courseCode"
                                                placeholder="e.g. IT-301"
                                                value={formData.courseCode}
                                                onChange={handleChange}
                                                required
                                                disabled={Boolean(editingCode)}
                                            />

                                        </div>

                                        <small>
                                            Unique code for this course
                                        </small>

                                    </div>



                                    {/* SUBJECT NAME */}

                                    <div className="beautiful-input-group">

                                        <label>
                                            Subject Name
                                            <span>*</span>
                                        </label>

                                        <div className="input-wrapper">

                                            <span className="input-icon">
                                                📖
                                            </span>

                                            <input
                                                type="text"
                                                name="subjectName"
                                                placeholder="e.g. Web Engineering"
                                                value={formData.subjectName}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                        <small>
                                            Full name of the subject
                                        </small>

                                    </div>



                                    {/* INSTRUCTOR */}

                                    <div className="beautiful-input-group">

                                        <label>
                                            Subject Instructor
                                            <span>*</span>
                                        </label>

                                        <div className="input-wrapper">

                                            <span className="input-icon">
                                                👨‍🏫
                                            </span>

                                            <input
                                                type="text"
                                                name="instructor"
                                                placeholder="e.g. Dr. Sarah Ahmed"
                                                value={formData.instructor}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                        <small>
                                            Name of the course instructor
                                        </small>

                                    </div>



                                    {/* CREDIT HOURS */}

                                    <div className="beautiful-input-group">

                                        <label>
                                            Credit Hours
                                            <span>*</span>
                                        </label>

                                        <div className="input-wrapper">

                                            <span className="input-icon">
                                                🎓
                                            </span>

                                            <select
                                                name="creditHours"
                                                value={formData.creditHours}
                                                onChange={handleChange}
                                                required
                                            >

                                                <option value="1">
                                                    1 Credit Hour
                                                </option>

                                                <option value="2">
                                                    2 Credit Hours
                                                </option>

                                                <option value="3">
                                                    3 Credit Hours
                                                </option>

                                                <option value="4">
                                                    4 Credit Hours
                                                </option>

                                                <option value="5">
                                                    5 Credit Hours
                                                </option>

                                            </select>

                                        </div>

                                        <small>
                                            Number of credit hours
                                        </small>

                                    </div>

                                </div>

                            </div>



                            {/* ==================================
                                SECTION 02 - ACADEMIC INFORMATION
                            ================================== */}

                            <div className="form-section">

                                <div className="form-section-title">

                                    <div className="section-number">
                                        02
                                    </div>

                                    <div>

                                        <h3>
                                            Academic Information
                                        </h3>

                                        <p>
                                            Specify the academic placement of the course
                                        </p>

                                    </div>

                                </div>


                                <div className="beautiful-form-grid">


                                    {/* SEMESTER */}

                                    <div className="beautiful-input-group">

                                        <label>
                                            Semester
                                            <span>*</span>
                                        </label>

                                        <div className="input-wrapper">

                                            <span className="input-icon">
                                                📚
                                            </span>

                                            <select
                                                name="semester"
                                                value={formData.semester}
                                                onChange={handleChange}
                                                required
                                            >

                                                <option value="">
                                                    Select Semester
                                                </option>

                                                <option value="1st">
                                                    1st Semester
                                                </option>

                                                <option value="2nd">
                                                    2nd Semester
                                                </option>

                                                <option value="3rd">
                                                    3rd Semester
                                                </option>

                                                <option value="4th">
                                                    4th Semester
                                                </option>

                                                <option value="5th">
                                                    5th Semester
                                                </option>

                                                <option value="6th">
                                                    6th Semester
                                                </option>

                                                <option value="7th">
                                                    7th Semester
                                                </option>

                                                <option value="8th">
                                                    8th Semester
                                                </option>

                                            </select>

                                        </div>

                                    </div>



                                    {/* DEPARTMENT */}

                                    <div className="beautiful-input-group">

                                        <label>
                                            Department
                                            <span>*</span>
                                        </label>

                                        <div className="input-wrapper">

                                            <span className="input-icon">
                                                🏛️
                                            </span>

                                            <select
                                                name="department"
                                                value={formData.department}
                                                onChange={handleChange}
                                                required
                                            >

                                                <option value="">
                                                    Select Department
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



                                    {/* SECTION */}

                                    <div className="beautiful-input-group">

                                        <label>
                                            Section
                                        </label>

                                        <div className="input-wrapper">

                                            <span className="input-icon">
                                                A
                                            </span>

                                            <input
                                                type="text"
                                                name="section"
                                                placeholder="e.g. A"
                                                value={formData.section}
                                                onChange={handleChange}
                                            />

                                        </div>

                                    </div>



                                    {/* CAPACITY */}

                                    <div className="beautiful-input-group">

                                        <label>
                                            Class Capacity
                                        </label>

                                        <div className="input-wrapper">

                                            <span className="input-icon">
                                                👥
                                            </span>

                                            <input
                                                type="number"
                                                name="capacity"
                                                min="1"
                                                placeholder="e.g. 40"
                                                value={formData.capacity}
                                                onChange={handleChange}
                                            />

                                        </div>

                                    </div>

                                </div>

                            </div>



                            {/* ==================================
                                SECTION 03 - CLASS SCHEDULE
                            ================================== */}

                            <div className="form-section">

                                <div className="form-section-title">

                                    <div className="section-number">
                                        03
                                    </div>

                                    <div>

                                        <h3>
                                            Class Schedule
                                        </h3>

                                        <p>
                                            Add classroom and timetable information
                                        </p>

                                    </div>

                                </div>


                                <div className="beautiful-form-grid">


                                    {/* CLASSROOM */}

                                    <div className="beautiful-input-group">

                                        <label>
                                            Classroom / Lab
                                        </label>

                                        <div className="input-wrapper">

                                            <span className="input-icon">
                                                🏫
                                            </span>

                                            <input
                                                type="text"
                                                name="room"
                                                placeholder="e.g. Lab 2"
                                                value={formData.room}
                                                onChange={handleChange}
                                            />

                                        </div>

                                    </div>



                                    {/* CLASS DAYS */}

                                    <div className="beautiful-input-group">

                                        <label>
                                            Class Days
                                        </label>

                                        <div className="input-wrapper">

                                            <span className="input-icon">
                                                📅
                                            </span>

                                            <input
                                                type="text"
                                                name="schedule"
                                                placeholder="e.g. Monday & Wednesday"
                                                value={formData.schedule}
                                                onChange={handleChange}
                                            />

                                        </div>

                                    </div>



                                    {/* CLASS TIME */}

                                    <div className="beautiful-input-group">

                                        <label>
                                            Class Time
                                        </label>

                                        <div className="input-wrapper">

                                            <span className="input-icon">
                                                🕐
                                            </span>

                                            <input
                                                type="text"
                                                name="time"
                                                placeholder="e.g. 10:00 AM - 11:30 AM"
                                                value={formData.time}
                                                onChange={handleChange}
                                            />

                                        </div>

                                    </div>

                                </div>

                            </div>



                            {/* ==================================
                                FORM BUTTONS
                            ================================== */}

                            <div className="beautiful-form-actions">


                                {editingCode && (

                                    <button
                                        type="button"
                                        className="form-cancel-btn"
                                        onClick={handleCancel}
                                    >

                                        <span>
                                            ↩
                                        </span>

                                        Cancel

                                    </button>

                                )}


                                <button
                                    type="submit"
                                    className="form-submit-btn"
                                >

                                    <span>
                                        {editingCode
                                            ? "✓"
                                            : "+"
                                        }
                                    </span>

                                    {editingCode
                                        ? "Update Subject"
                                        : "Add Subject"
                                    }

                                </button>

                            </div>

                        </form>

                    </div>



                    {/* ==================================
                        SUBJECT TOOLBAR
                    ================================== */}

                    <div className="subjects-toolbar">

                        <div>

                            <h3>
                                All Subjects
                            </h3>

                            <p>
                                {filteredSubjects.length} subject(s) found
                            </p>

                        </div>


                        <input
                            type="search"
                            className="subject-search"
                            placeholder="Search by course, name, instructor..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>



                    {/* ==================================
                        SUBJECT CARDS
                    ================================== */}

                    <div className="subjects-grid">


                        {filteredSubjects.length === 0 ? (

                            <div className="empty-subjects">

                                <div className="empty-icon">
                                    📚
                                </div>

                                <h3>
                                    No Subjects Found
                                </h3>

                                <p>

                                    {search
                                        ? "No subjects match your search."
                                        : "Add your first subject using the form above."
                                    }

                                </p>

                            </div>

                        ) : (

                            filteredSubjects.map(
                                (subject) => (

                                    <div
                                        className="subject-card"
                                        key={subject.courseCode}
                                    >


                                        {/* CARD TOP */}

                                        <div className="subject-card-top">

                                            <span className="course-code">
                                                {subject.courseCode}
                                            </span>


                                            <div className="subject-actions">


                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleEdit(subject)
                                                    }
                                                    title="Edit Subject"
                                                >
                                                    ✏️
                                                </button>


                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            subject.courseCode
                                                        )
                                                    }
                                                    title="Delete Subject"
                                                >
                                                    🗑️
                                                </button>

                                            </div>

                                        </div>



                                        {/* SUBJECT NAME */}

                                        <h3>
                                            {subject.subjectName}
                                        </h3>



                                        {/* INSTRUCTOR */}

                                        <div className="subject-instructor">

                                            <span>
                                                Instructor
                                            </span>

                                            <strong>
                                                {subject.instructor}
                                            </strong>

                                        </div>



                                        {/* DETAILS */}

                                        <div className="subject-details">


                                            <div>

                                                <span>
                                                    Credits
                                                </span>

                                                <strong>
                                                    ⭐ {subject.creditHours}
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Semester
                                                </span>

                                                <strong>
                                                    {subject.semester || "N/A"}
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Section
                                                </span>

                                                <strong>
                                                    {subject.section || "N/A"}
                                                </strong>

                                            </div>

                                        </div>



                                        {/* EXTRA INFORMATION */}

                                        <div className="subject-extra">


                                            <p>

                                                🏢

                                                <strong>
                                                    Department:
                                                </strong>

                                                {" "}

                                                {subject.department ||
                                                    "Not assigned"}

                                            </p>


                                            <p>

                                                🏫

                                                <strong>
                                                    Room:
                                                </strong>

                                                {" "}

                                                {subject.room ||
                                                    "Not assigned"}

                                            </p>


                                            <p>

                                                📅

                                                <strong>
                                                    Days:
                                                </strong>

                                                {" "}

                                                {subject.schedule ||
                                                    "Not assigned"}

                                            </p>


                                            <p>

                                                🕐

                                                <strong>
                                                    Time:
                                                </strong>

                                                {" "}

                                                {subject.time ||
                                                    "Not assigned"}

                                            </p>


                                            <p>

                                                👥

                                                <strong>
                                                    Capacity:
                                                </strong>

                                                {" "}

                                                {subject.capacity ||
                                                    "N/A"}

                                            </p>

                                        </div>

                                    </div>

                                )
                            )

                        )}

                    </div>



                    {/* ==================================
                        BACK TO DASHBOARD
                    ================================== */}

                    <Link
                        to="/dashboard"
                        className="back-dashboard"
                    >
                        ← Back to Dashboard
                    </Link>

                </div>

            </main>

        </div>
    );
}


export default Subjects;