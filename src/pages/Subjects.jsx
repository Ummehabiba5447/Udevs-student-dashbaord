
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import {
    getSubjects,
    createSubject,
    updateSubject,
    deleteSubject
} from "../utils/subjectStorage";


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


function Subjects() {

    const [subjects, setSubjects] = useState({});

    const [formData, setFormData] = useState(emptyForm);

    const [editingCode, setEditingCode] = useState(null);

    const [message, setMessage] = useState("");

    const [search, setSearch] = useState("");


  useEffect(() => {
    const data = getSubjects();
    setSubjects(data);
}, []);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


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


        setMessage(result.message);


       if (result.success) {

    setFormData({
        ...emptyForm
    });

    setEditingCode(null);

    setSubjects(getSubjects());


            setTimeout(() => {
                setMessage("");
            }, 3000);
        }
    };


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

        setEditingCode(subject.courseCode);

        setMessage("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    const handleDelete = (courseCode) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete " + courseCode + "?"
        );


        if (!confirmed) {
            return;
        }


        const result = deleteSubject(courseCode);

        setMessage(result.message);


        if (result.success) {

    setSubjects(getSubjects());

    if (editingCode === courseCode) {
        handleCancel();
    }



            setTimeout(() => {
                setMessage("");
            }, 3000);
        }
    };


    const handleCancel = () => {

        setEditingCode(null);

        setFormData({
            ...emptyForm
        });

        setMessage("");
    };


    const filteredSubjects = Object.values(subjects).filter(
        (subject) => {

            const searchText =
                search.toLowerCase().trim();


            return (
                subject.courseCode
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                subject.subjectName
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                subject.instructor
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                subject.department
                    ?.toLowerCase()
                    .includes(searchText)
            );
        }
    );


    const totalCreditHours =
        filteredSubjects.reduce(
            (total, subject) => {

                return (
                    total +
                    Number(subject.creditHours || 0)
                );
            },
            0
        );


    return (
        <div className="dashboard-layout">

            <Sidebar />

            <main className="dashboard-main">

                <Header />

                <div className="dashboard-content">

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

                            <div className="selected-count">

                                <strong>
                                    {filteredSubjects.length}
                                </strong>

                                <span>
                                    Subjects
                                </span>

                            </div>


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

                    <div className="subject-form-card">

                        <div style={{ marginBottom: "25px" }}>

                            <span
                                style={{
                                    fontSize: "12px",
                                    fontWeight: "700",
                                    color: "#f0a500",
                                    letterSpacing: "1px"
                                }}
                            >
                                {editingCode
                                    ? "UPDATE COURSE"
                                    : "CREATE COURSE"}
                            </span>


                            <h2
                                style={{
                                    marginTop: "5px",
                                    color: "#1e3a5f"
                                }}
                            >
                                {editingCode
                                    ? "Edit Subject"
                                    : "Add New Subject"}
                            </h2>

                        </div>


                        <form onSubmit={handleSubmit}>

                            <div className="subject-form-grid">

                                <div className="form-group">

                                    <label>
                                        Course Code *
                                    </label>

                                    <input
                                        type="text"
                                        name="courseCode"
                                        placeholder="e.g. IT-301"
                                        value={formData.courseCode}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Subject Name *
                                    </label>

                                    <input
                                        type="text"
                                        name="subjectName"
                                        placeholder="e.g. Web Engineering"
                                        value={formData.subjectName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Subject Instructor *
                                    </label>

                                    <input
                                        type="text"
                                        name="instructor"
                                        placeholder="e.g. Dr. Sarah Ahmed"
                                        value={formData.instructor}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Credit Hours *
                                    </label>

                                    <select
                                        name="creditHours"
                                        value={formData.creditHours}
                                        onChange={handleChange}
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

                                <div className="form-group">

                                    <label>
                                        Semester *
                                    </label>

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

                                <div className="form-group">

                                    <label>
                                        Department *
                                    </label>

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

                                <div className="form-group">

                                    <label>
                                        Section
                                    </label>

                                    <input
                                        type="text"
                                        name="section"
                                        placeholder="e.g. A"
                                        value={formData.section}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Classroom / Lab
                                    </label>

                                    <input
                                        type="text"
                                        name="room"
                                        placeholder="e.g. Lab 2"
                                        value={formData.room}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Class Days
                                    </label>

                                    <input
                                        type="text"
                                        name="schedule"
                                        placeholder="e.g. Monday & Wednesday"
                                        value={formData.schedule}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Class Time
                                    </label>

                                    <input
                                        type="text"
                                        name="time"
                                        placeholder="e.g. 10:00 AM - 11:30 AM"
                                        value={formData.time}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Class Capacity
                                    </label>

                                    <input
                                        type="number"
                                        name="capacity"
                                        min="1"
                                        value={formData.capacity}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "12px",
                                    marginTop: "25px"
                                }}
                            >

                                <button
                                    type="submit"
                                    className="primary-btn"
                                >

                                    {editingCode
                                        ? "Update Subject"
                                        : "Add Subject"}

                                </button>


                                {editingCode && (

                                    <button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>

                                )}

                            </div>

                        </form>

                    </div>

                    <div className="subjects-toolbar">

                        <div>

                            <h3>
                                All Subjects
                            </h3>

                            <p>
                                {filteredSubjects.length}
                                {" "}subject(s) found
                            </p>

                        </div>


                        <input
                            type="search"
                            className="subject-search"
                            placeholder="Search by course, name or instructor..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>

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
                                        : "Add your first subject using the form above."}
                                </p>

                            </div>

                        ) : (

                            filteredSubjects.map(
                                (subject) => (

                                    <div
                                        className="subject-card"
                                        key={subject.courseCode}
                                    >

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

                                        <h3>
                                            {subject.subjectName}
                                        </h3>

                                        <div className="subject-instructor">

                                            <span>
                                                Instructor
                                            </span>

                                            <strong>
                                                {subject.instructor}
                                            </strong>

                                        </div>

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

                                        <div className="subject-extra">

                                            <p>
                                                🏢
                                                <strong>
                                                    Department:
                                                </strong>
                                                {" "}
                                                {subject.department || "Not assigned"}
                                            </p>


                                            <p>
                                                🏫
                                                <strong>
                                                    Room:
                                                </strong>
                                                {" "}
                                                {subject.room || "Not assigned"}
                                            </p>


                                            <p>
                                                📅
                                                <strong>
                                                    Days:
                                                </strong>
                                                {" "}
                                                {subject.schedule || "Not assigned"}
                                            </p>


                                            <p>
                                                🕐
                                                <strong>
                                                    Time:
                                                </strong>
                                                {" "}
                                                {subject.time || "Not assigned"}
                                            </p>


                                            <p>
                                                👥
                                                <strong>
                                                    Capacity:
                                                </strong>
                                                {" "}
                                                {subject.capacity || "N/A"}
                                            </p>

                                        </div>

                                    </div>

                                )
                            )

                        )}

                    </div>

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
