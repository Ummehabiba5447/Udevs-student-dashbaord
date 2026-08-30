const SUBJECTS_KEY = "subjects";


export const getSubjects = () => {

    const data = localStorage.getItem(SUBJECTS_KEY);

    return data ? JSON.parse(data) : {};

};


const saveSubjects = (subjects) => {

    localStorage.setItem(
        SUBJECTS_KEY,
        JSON.stringify(subjects)
    );

};


export const createSubject = (subject) => {

    const subjects = getSubjects();

    const courseCode =
        subject.courseCode.trim().toUpperCase();


    if (subjects[courseCode]) {

        return {
            success: false,
            message: "Course code already exists."
        };

    }


    subjects[courseCode] = {
        ...subject,
        courseCode: courseCode
    };


    saveSubjects(subjects);


    return {
        success: true,
        message: "Subject added successfully."
    };

};


export const getSubjectByCode = (courseCode) => {

    const subjects = getSubjects();

    const code =
        courseCode.trim().toUpperCase();

    return subjects[code] || null;

};


export const updateSubject = (
    oldCourseCode,
    updatedSubject
) => {

    const subjects = getSubjects();

    const oldCode =
        oldCourseCode.trim().toUpperCase();

    const newCode =
        updatedSubject.courseCode
            .trim()
            .toUpperCase();


    if (!subjects[oldCode]) {

        return {
            success: false,
            message: "Subject not found."
        };

    }


    if (
        oldCode !== newCode &&
        subjects[newCode]
    ) {

        return {
            success: false,
            message: "New course code already exists."
        };

    }


    delete subjects[oldCode];


    subjects[newCode] = {
        ...updatedSubject,
        courseCode: newCode
    };


    saveSubjects(subjects);


    return {
        success: true,
        message: "Subject updated successfully."
    };

};


export const deleteSubject = (courseCode) => {

    const subjects = getSubjects();

    const code =
        courseCode.trim().toUpperCase();


    if (!subjects[code]) {

        return {
            success: false,
            message: "Subject not found."
        };

    }


    delete subjects[code];


    saveSubjects(subjects);


    return {
        success: true,
        message: "Subject deleted successfully."
    };

};