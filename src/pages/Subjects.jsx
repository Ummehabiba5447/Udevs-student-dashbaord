import { useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";


function Subjects() {

    const availableSubjects = [
        {
            id: 1,
            name: "Web Development",
            code: "IT-301",
            instructor: "Dr. Sarah Ahmed",
            credits: 3,
            icon: "💻",
            color: "blue"
        },
        {
            id: 2,
            name: "Database Systems",
            code: "IT-302",
            instructor: "Mr. Hassan Ali",
            credits: 3,
            icon: "🗄️",
            color: "purple"
        },
        {
            id: 3,
            name: "Software Engineering",
            code: "SE-305",
            instructor: "Dr. Ayesha Khan",
            credits: 3,
            icon: "⚙️",
            color: "green"
        },
        {
            id: 4,
            name: "Artificial Intelligence",
            code: "AI-401",
            instructor: "Dr. Hamza Malik",
            credits: 3,
            icon: "🤖",
            color: "orange"
        },
        {
            id: 5,
            name: "Computer Networks",
            code: "CN-304",
            instructor: "Mr. Usman Raza",
            credits: 3,
            icon: "🌐",
            color: "pink"
        },
        {
            id: 6,
            name: "Software Project Management",
            code: "SPM-402",
            instructor: "Dr. Maria Khan",
            credits: 3,
            icon: "📋",
            color: "teal"
        }
    ];


    const savedStudent = JSON.parse(
        localStorage.getItem("student")
    );


    const [selectedSubjects, setSelectedSubjects] =
        useState(
            savedStudent?.subjects || []
        );


    const toggleSubject = (subject) => {

        let updatedSubjects;

        const exists = selectedSubjects.some(
            item => item.id === subject.id
        );


        if (exists) {

            updatedSubjects =
                selectedSubjects.filter(
                    item => item.id !== subject.id
                );

        } else {

            updatedSubjects = [
                ...selectedSubjects,
                subject
            ];

        }


        setSelectedSubjects(updatedSubjects);

        const student = JSON.parse(
            localStorage.getItem("student")
        );


        const updatedStudent = {
            ...student,
            subjects: updatedSubjects
        };


        localStorage.setItem(
            "student",
            JSON.stringify(updatedStudent)
        );

    };


    return (
        <div className="dashboard-layout">

            <Sidebar />

            <main className="dashboard-main">

                <Header />


                <div className="dashboard-content">

                    <div className="page-title">

                        <div>

                            <span>
                                ACADEMIC
                            </span>

                            <h2>
                                My Subjects
                            </h2>

                            <p>
                                Select the subjects you are
                                enrolled in this semester.
                            </p>

                        </div>


                        <div className="selected-count">

                            <strong>
                                {selectedSubjects.length}
                            </strong>

                            <span>
                                Selected
                            </span>

                        </div>

                    </div>

                    <div className="subjects-grid">

                        {availableSubjects.map(
                            (subject) => {

                                const isSelected =
                                    selectedSubjects.some(
                                        item =>
                                            item.id === subject.id
                                    );


                                return (

                                    <div
                                        key={subject.id}
                                        className={
                                            `subject-card ${
                                                isSelected
                                                    ? "selected"
                                                    : ""
                                            }`
                                        }
                                    >

                                        <div className="subject-card-top">

                                            <div
                                                className={
                                                    `large-subject-icon ${subject.color}`
                                                }
                                            >
                                                {subject.icon}
                                            </div>


                                            <button
                                                className={
                                                    `select-button ${
                                                        isSelected
                                                            ? "selected"
                                                            : ""
                                                    }`
                                                }
                                                onClick={() =>
                                                    toggleSubject(
                                                        subject
                                                    )
                                                }
                                            >

                                                {isSelected
                                                    ? "✓ Selected"
                                                    : "+ Select"}

                                            </button>

                                        </div>


                                        <div className="subject-card-content">

                                            <span className="subject-code">
                                                {subject.code}
                                            </span>

                                            <h3>
                                                {subject.name}
                                            </h3>

                                            <p>
                                                {subject.instructor}
                                            </p>

                                        </div>


                                        <div className="subject-card-footer">

                                            <span>
                                                ⭐ {subject.credits} Credits
                                            </span>

                                            <span>
                                                Semester 1
                                            </span>

                                        </div>

                                    </div>

                                );
                            }
                        )}

                    </div>

                    <div className="selected-section">

                        <div className="section-heading">

                            <div>

                                <span>
                                    YOUR SELECTION
                                </span>

                                <h2>
                                    Selected Subjects
                                </h2>

                            </div>

                        </div>


                        {selectedSubjects.length === 0 ? (

                            <div className="empty-subjects">

                                <div>
                                    📚
                                </div>

                                <h3>
                                    No subjects selected
                                </h3>

                                <p>
                                    Select subjects above to
                                    add them to your semester.
                                </p>

                            </div>

                        ) : (

                            <div className="selected-subject-list">

                                {selectedSubjects.map(
                                    (subject) => (

                                        <div
                                            className="selected-subject"
                                            key={subject.id}
                                        >

                                            <div
                                                className={
                                                    `subject-icon ${subject.color}`
                                                }
                                            >
                                                {subject.icon}
                                            </div>

                                            <div>
                                                <strong>
                                                    {subject.name}
                                                </strong>

                                                <span>
                                                    {subject.code}
                                                </span>
                                            </div>

                                            <button
                                                onClick={() =>
                                                    toggleSubject(
                                                        subject
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>

                                        </div>

                                    )
                                )}

                            </div>

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