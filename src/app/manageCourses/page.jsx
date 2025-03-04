"use client"

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function AdminPanel() {

    const [courses, setCourses] = useState([]);  // Loading courses from DB
    const [editMode, setEditMode] = useState(false); // Changing Button Name
    const [CName, setCName] = useState("");
    const [Teacher, setTeacher] = useState("");

    // ============================================================================

    const resetFields = () => {
        setCName("");
        setTeacher("");
    };

    // ============================================================================

    useEffect(() => {
        CourseLoading();
    }, [courses]);

    // ============================================================================

    const CourseLoading = async () => {
        const response = await axios.get("/api/course");
        setCourses(response.data);
    };

    // ============================================================================

    const handleAddCourse = async () => {
        if (CName === "" || Teacher === "") {
            Swal.fire('Error', 'Please fill all fields!', 'error');
            return;
        }

        const duplicateCourse = courses.some(course => course.CName === CName);

        if (duplicateCourse) {
            Swal.fire('Error', 'Course with the same name already exists!', 'error');
            return;
        } else {
            await axios.post('/api/course', { CName, Teacher });
            Swal.fire('Success', 'Course added successfully!', 'success');
            resetFields();
            setEditMode(false);
        }
    };

    // ============================================================================

    const handleDeleteCourse = async (CName) => {
        setCName(CName);
        await axios.delete('/api/course', { data: { CName } });
        Swal.fire('Success', 'Course deleted successfully!', 'success');
        resetFields();
        setEditMode(false);
    };

    // ============================================================================

    const handleEditCourse = async () => {
        await axios.patch('/api/course', { CName, Teacher });
        Swal.fire('Success', 'Course updated successfully!', 'success');
        resetFields();
        setEditMode(false);
    };

    // ============================================================================

    return (
        <div className="p-6 bg-white min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Courses Panel</h1>

            {/* Add Course Form */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4 text-blue-600">{editMode ? 'Edit Course' : 'Add Course'}</h2>
                <form onSubmit={handleAddCourse} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {editMode ? "" : <input type="text" required value={CName} onChange={(e) => setCName(e.target.value)} placeholder="Course Name" className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />}
                    <input type="text" required value={Teacher} onChange={(e) => setTeacher(e.target.value)} placeholder="Teacher Name" className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
                </form>
                {
                    editMode
                        ? <button onClick={handleEditCourse} className="mt-2 text-white w-full font-bold py-2 px-4 rounded bg-green-600 hover:bg-green-700">Edit Course</button>
                        : <button onClick={handleAddCourse} className="mt-2 text-white w-full font-bold py-2 px-4 rounded bg-blue-600 hover:bg-blue-700">Add Course</button>
                }
            </div>

            {/* Courses Table */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6 overflow-y-scroll">
                <h2 className="text-xl font-semibold mb-4 text-blue-600">Course List  ({courses.length})</h2>
                <table className="w-full table-auto border-collapse border border-gray-200">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="border px-4 py-2 text-left">Course Name</th>
                            <th className="border px-4 py-2 text-left">Teacher</th>
                            <th className="border px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.CName}>
                                <td className="border px-4 py-2">{course.CName}</td>
                                <td className="border px-4 py-2">{course.Teacher}</td>
                                <td className="border px-4 py-2 flex justify-center md:gap-3 gap-1">
                                    {/* Edit Button */}
                                    <button
                                        className="w-[60px] md:w-[100px] text-center bg-blue-600 text-white p-1 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
                                        onClick={() => {
                                            setCName(course.CName);
                                            setTeacher(course.Teacher);
                                            setEditMode(true);
                                        }}
                                    >
                                        Edit
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        className="w-[60px] md:w-[100px] text-center bg-red-600 text-white p-1 rounded-md shadow-md hover:bg-red-700 transition duration-200"
                                        onClick={() => handleDeleteCourse(course.CName)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
