"use client"

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function AdminPanel() {

    const [students, setStudents] = useState([]);    // Loading students from DB
    const [editMode, setEditMode] = useState(false); // Changing Button Name
    const [fullName, setFullName] = useState("");
    const [reg, setReg] = useState("");

    // ============================================================================

    const resetFields = () => {
        setFullName("");
        setReg("");
    };

    // ============================================================================

    useEffect(() => {
        StudentLoading();
    }, [students]);

    // ============================================================================

    const StudentLoading = async () => {

        const response = await axios.get("/api/admin");

        setStudents(response.data);

    };

    // ============================================================================

    const handleAddStudent = async () => {

        if (fullName === "" || reg === "") {
            Swal.fire('Error', 'Please fill all fields!', 'error');
            return;
        }

        const duplicateReg = students.some(student => student.reg === reg);

        if (duplicateReg) {
            Swal.fire('Error', 'Student with the same registration number already exists!', 'error');
            return;
        }
        else {

            await axios.post('/api/admin', { reg, fullName });
            Swal.fire('Success', 'Student added successfully!', 'success');
            resetFields();
            setEditMode(false);

        }


    };

    // ============================================================================

    const handleDeleteStudent = async (reg) => {
        setReg(reg);
        await axios.delete('/api/admin', { data: { reg } });
        Swal.fire('Success', 'Student deleted successfully!', 'success');
        resetFields();
        setEditMode(false);

    };

    // ============================================================================

    const handleEditStudent = async () => {
        await axios.patch('/api/admin', { reg, fullName });
        Swal.fire('Success', 'Student updated successfully!', 'success');
        resetFields();
        setEditMode(false);
    };

    // ============================================================================

    return (
        <div className="p-6 bg-white min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Students Panel</h1>

            {/* Add Student Form */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4 text-blue-600">{editMode ? 'Edit Student' : 'Add Student'}</h2>
                <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
                    {
                        editMode ?
                            ''
                            :
                            <input type="text" required value={reg} onChange={(e) => setReg(e.target.value)} placeholder="Registration Number" className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
                    }
                </form>
                {
                    editMode
                        ?
                        <button onClick={handleEditStudent} className="mt-2 text-white w-full font-bold py-2 px-4 rounded bg-green-600 hover:bg-green-700">Edit Student</button>
                        :
                        <button onClick={handleAddStudent} className="mt-2 text-white w-full font-bold py-2 px-4 rounded bg-blue-600 hover:bg-blue-700">Add Student</button>
                }
            </div>

            {/* Students Table */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6  overflow-y-scroll">
                <h2 className="text-xl font-semibold mb-4 text-blue-600">Student List ({students.length})</h2>
                <table className="w-full table-auto border-collapse border border-gray-200">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="border px-4 py-2 text-left">Reg #</th>
                            <th className="border px-4 py-2 text-left">Name</th>
                            <th className="border px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...students]
                            .sort((a, b) => a.reg.localeCompare(b.reg))
                            .map((student) => (
                                <tr key={student.reg}>
                                    <td className="border px-4 py-2">{student.reg}</td>
                                    <td className="border px-4 py-2">{student.fullName}</td>
                                    <td className="border px-4 py-2 flex justify-center md:gap-3 gap-1">
                                        {/* Edit Button */}
                                        <button
                                            className="w-[60px] md:w-[100px] text-center bg-blue-600 text-white p-1 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
                                            onClick={() => {
                                                setFullName(student.fullName);
                                                setReg(student.reg);
                                                setEditMode(true);
                                            }}
                                        >
                                            Edit
                                        </button>

                                        {/* Delete Button */}
                                        <button
                                            className="w-[60px] md:w-[100px] text-center bg-red-600 text-white p-1 rounded-md shadow-md hover:bg-red-700 transition duration-200"
                                            onClick={() => {
                                                handleDeleteStudent(student.reg);
                                            }}
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
