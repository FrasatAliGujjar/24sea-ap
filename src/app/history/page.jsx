"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';

const Attendance = () => {

    const [dbAttendance, setDbAttendance] = useState([]);   // OverAll Attendance Load From Database
    const [dbCourses, setDbCourses] = useState([]);         // Courses Load From Database


    // State to store the selected Course
    const [SelectedCourse, setSelectedCourse] = useState("");
    // __________________________________________________________________

    useEffect(() => {

        HistoryLoading();
        CoursesLoading();

    }, [SelectedCourse]);

    // __________________________________________________________________

    const HistoryLoading = async () => {

        const response = await axios.get("/api/attendance");

        setDbAttendance(response.data);

    };

    // __________________________________________________________________

    const CoursesLoading = async () => {

        const response = await axios.get("/api/course");

        setDbCourses(response.data);

    };

    // __________________________________________________________________

    const FilterCourseRecords = () => {

        if (SelectedCourse === "") {
            Swal.fire('Error', 'Select the Course Title First', 'error');
            return;

        }
        else {
            const filteredData = dbAttendance.filter(
                (attendance) => attendance.course === SelectedCourse
            );
            setDbAttendance(filteredData);
        }
    }

    // __________________________________________________________________



    return (
        <>
            {/* ===================================================================== */}
            <div className="right mb-1 flex items-center flex-col border-1 border-solid border-blue-400 border-l-0 w-full lg:w-full h-[730px] md:h-[540px] p-2">
                {/* Header */}
                <div className="flex flex-col items-center p-4 bg-blue-50 shadow-lg border-1 border-blue-500 rounded-lg w-full">
                    <h1 className="text-3xl font-extrabold text-blue-800 mb-4">
                        Attendance History Portal
                    </h1>
                </div>

                {/* -------------------------------- */}

                <div className="border border-blue-500 rounded-lg w-full flex flex-wrap md:flex-row justify-center items-center p-4 bg-white shadow-md">

                    {/* Subject Selection */}
                    <div className="w-full md:w-auto flex flex-col items-center">
                        <label htmlFor="grade" className="block text-blue-800 text-sm font-bold mb-2">
                            Select Subject
                        </label>
                        <select
                            id="grade"
                            className="border border-blue-400 bg-white rounded-md px-3 py-2 w-full md:w-[250px] text-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                            value={SelectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                        >
                            <option value="">Select a subject</option>
                            {dbCourses.map((subject, index) => (
                                <option key={index} value={subject.CName}>
                                    {subject.CName}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={FilterCourseRecords}
                            className="m-3 px-4 py-2 w-full md:w-[250px] bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Submit Record
                        </button>
                    </div>

                </div>

                {/* -------------------------------- */}

                {/* Attendance Table */}
                <div className="w-full overflow-x-auto mt-4">
                    <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-blue-500 text-white text-lg">
                                <th className="p-3 border">Course</th>
                                <th className="p-3 border">Date</th>
                                <th className="p-3 border">Time</th>
                                <th className="p-3 border">Absent Reg</th>
                                <th className="p-3 border">Present</th>
                                <th className="p-3 border">Absent</th>
                                <th className="p-3 border">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dbAttendance.length > 0 ? (
                                dbAttendance.map((record, index) => (
                                    <tr
                                        key={index}
                                        className="border-b text-center text-blue-800 bg-blue-50 hover:bg-blue-100"
                                    >
                                        <td className="p-3 border">{record.course}</td>
                                        <td className="p-3 border">{record.date}</td>
                                        <td className="p-3 border">{record.time}</td>
                                        <td className="p-3 border">{record.absent_reg}</td>
                                        <td className="p-3 border">{record.no_present_std}</td>
                                        <td className="p-3 border">{record.no_absent_std}</td>
                                        <td className="p-3 border">{record.total_std}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center text-blue-800 font-semibold py-4"
                                    >
                                        No records found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* ===================================================================== */}
        </>
    )
}

export default Attendance
