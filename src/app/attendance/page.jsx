"use client"

import React, { useEffect, useState } from 'react'
import Style from "./add_student.module.css";
import Sidebar from '../modules/sidebar/sidebar.jsx';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Attendance = () => {

    // __________________________________________________________________


    let [m, SetMove] = useState(true); // Dropdown Move Event

    // __________________________________________________________________


    const [dbStudents, setDbStudents] = useState([]); // Students Load From Database
    const [dbCourses, setDbCourses] = useState([]); // Courses Load From Database

    // __________________________________________________________________

    // State to store the selected Course
    const [SelectedCourse, setSelectedCourse] = useState("");

    // __________________________________________________________________








    // ===================================== [ Adding New Students From Drop Down] =================================================


    // __________________________________________________________________

    let [fullName, setFullName] = useState("");
    let [reg, setReg] = useState("");

    // __________________________________________________________________

    useEffect(() => {
        CoursesLoading();
        StudentLoading();
    }, [dbStudents]);

    // __________________________________________________________________

    const reset = () => {
        setFullName("");
        setReg("");
    }

    // __________________________________________________________________

    const StudentLoading = async () => {

        const response = await axios.get("/api/admin");

        setDbStudents(response.data);

    };

    // __________________________________________________________________

    const CoursesLoading = async () => {

        const response = await axios.get("/api/course");

        setDbCourses(response.data);

    };

    // __________________________________________________________________

    const handleAddStudent = async (e) => {
        e.preventDefault();

        if (fullName === "" || reg === "") {
            Swal.fire('Error', 'Please fill all fields!', 'error');
            return;
        }

        const duplicateReg = dbStudents.some(student => student.reg === reg);

        if (duplicateReg) {
            Swal.fire('Error', 'Student with the same registration number already exists!', 'error');
            return;
        }
        else {

            await axios.post('/api/admin', { reg, fullName });
            Swal.fire('Success', 'Student added successfully!', 'success');
            reset();
            SetMove(true);

        }
    };

    // __________________________________________________________________


    // ===================================== [ Adding New Students From Drop Down] =================================================














    // ===================================== [ Storing Absent Students ] =================================================

    const [absent_std, setAbsentStd] = useState([]); // Absent students' registration numbers

    // Function to mark student as absent
    const markAbsent = (reg) => {
        setAbsentStd((prevAbsent) => [...prevAbsent, reg]);
    };

    // Function to mark student as present
    const markPresent = (reg) => {
        setAbsentStd((prevAbsent) => prevAbsent.filter((stdReg) => stdReg !== reg));
    };

    // ===================================== [ Storing Absent Students ] =================================================















    // ===================================== [ Calculate Full Attendance ] =================================================

    const Calculate = async () => {

        const course = SelectedCourse.toString();
        const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(',', '').toString();
        const time = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).replace(' ', ' : ').toString();
        const absent_reg = absent_std.join(", ");
        const no_present_std = (dbStudents.length - absent_std.length).toString();
        const no_absent_std = (absent_std.length).toString();
        const total_std = (dbStudents.length).toString()
        // ___________________________________________________

        if (!course) {
            Swal.fire({
                icon: "warning",
                title: "Missing Fields",
                text: "Please select the course first and ensure all fields are filled!",
            });
            return;
        }
        // ___________________________________________________

        await axios.post('/api/attendance',
            {
                course,
                date,
                time,
                absent_reg,
                no_present_std,
                no_absent_std,
                total_std
            });

        Swal.fire('Success', 'Attendance Submitted', 'success');
        // ___________________________________________________

        // const phoneNumber = "+923419385624"; // Frasat Ali Gujjar
        const phoneNumber = "+923002552128"; // CR

        const message = encodeURIComponent(
            `*Asslam-o-Alaikum Sir !*\n\n` +
            `*________________________*\n\n` +
            `*Name:*             Cr.Ahmad Ammar\n` +
            `*Section:*          SE-A\n` +
            `*Batch:*             2024\n` +
            `*Department:*  DCS\n\n` +
            `*________________________*\n\n` +
            `*Date:* ${date}\n\n` +
            `*Time:* ${time}\n\n` +
            `*Total Students:* ${total_std}\n` +
            `*Present:* ${no_present_std}\n` +
            `*Absent:* ${no_absent_std}\n\n` +
            `*Course:*\n` +
            `${course}\n\n` +
            `*Absent Students:*\n` +
            `${absent_reg}\n\n` +
            `*________________________*\n\n` +
            `*Jazakallah!*`
        );

        const url = `https://wa.me/${phoneNumber}?text=${message}`;
        
        window.open(url, "_blank");

        // ___________________________________________________

    }

    // ===================================== [ Calculate Full Attendance ] =================================================










    // ===================================== [ Whatsapp Connection ] =================================================

    const sendToWhatsApp = () => {
        const phoneNumber = "+923419385624";

        const message = encodeURIComponent(
            `*📅 Date:* ${date}\n\n` +
            `*📚 Course:* ${course}\n\n` +
            `*👥 Total Students:* ${total_std}\n` +
            `*✅ Present:* ${no_present_std}\n` +
            `*❌ Absent:* ${no_absent_std}\n\n` +
            `*📌 Absent Students:* ${absent_reg}`
        );

        const url = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(url, "_blank");
    };

    // ===================================== [ Whatsapp Connection ] =================================================
























    return (
        <>





            {/* ====================== [ Add Std ]======================= */}
            <div className={`${Style.OverLayer} ${m ? Style.OverLayer_hide : Style.OverLayer_show} flex justify-center items-center`}>
                <div className={`bg-white p-8 rounded-lg shadow-lg w-[90%] md:w-[500px] ${m ? Style.OverLayer_hide : Style.OverLayer_show}`}>
                    <div className="flex justify-between items-center mb-1">
                        <h2 className="text-lg font-medium">Add New Student</h2>
                        <button onClick={() => SetMove(!m)} className="text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleAddStudent}>
                        <div className="mb-3">
                            <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                            <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter Name" className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="reg" className="block text-gray-700 text-sm font-bold mb-2">Registration #</label>
                            <input type="text" id="reg" value={reg} onChange={(e) => setReg(e.target.value)} placeholder="Enter Registration Number" className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300" required />
                        </div>

                        <div className="flex justify-end">
                            <button type="button" onClick={() => SetMove(true)} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded mr-2">Cancel</button>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* ============================================================= */}














            <div className="main flex border-1 rounded-sm border-solid border-gray-400 w-[100%] h-auto overflow-x-scroll md:overflow-visible">
                {/* Left side  */}
                <Sidebar />

                {/* Right side  */}
                <div className={`right mb-1 flex items-center flex-col border-1 border-solid border-gray-400 border-l-0 w-[100%] lg:w-[79%] h-[730px] md:h-[600px] overflow-y-scroll p-2 ${m ? 'block' : 'hidden'}`}>
                    {/* ========================== [ Header ] ======================================== */}
                    <div className="flex flex-col items-center p-4 bg-blue-50 shadow-lg border-1 border-blue-500 rounded-lg w-full">
                        <h1 className="text-3xl font-extrabold text-blue-800 mb-4">24-SEA Attendance Portal</h1>
                        <div className="flex items-center justify-center w-full mb-6">
                            <button
                                onClick={() => SetMove(!m)}
                                className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all focus:ring focus:ring-blue-300 focus:outline-none"
                            >
                                + Add New Student
                            </button>
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
                            </div>

                        </div>

                        {/* -------------------------------- */}
                    </div>

                    {/* ================================= [ Attendance Pannel ] ============================================= */}
                    <div className="w-full p-4 bg-blue-50 border-1 border-red-600">
                        <div className="flex bg-blue-600 text-white font-semibold rounded-t-lg shadow-md">
                            <div className="w-1/5 p-2 text-center border-r border-white">Roll #</div>
                            <div className="w-2/5 p-2 text-center border-r border-white">Name ({dbStudents.length})</div>
                            <div className="w-2/5 p-2 text-center">Attendance Status</div>
                        </div>
                        {[...dbStudents]
                            .sort((a, b) => a.reg.localeCompare(b.reg))
                            .map((student, i) => (
                                <div key={i} className="flex bg-white even:bg-blue-100 border-b border-blue-300 shadow-sm">
                                    <div className="w-1/5 p-2 text-center border-r border-blue-300">{student.reg}</div>
                                    <div className="w-2/5 p-2 text-center border-r border-blue-300">{student.fullName}</div>
                                    <div className="w-2/5 p-2 flex justify-center items-center gap-2">
                                        {!absent_std.includes(student.reg) ? (
                                            <div
                                                className="w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 bg-blue-500"
                                                onClick={() => markAbsent(student.reg)}
                                            >
                                                <div className="w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 translate-x-8"></div>
                                            </div>
                                        ) : (
                                            <div
                                                className="w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 bg-red-500"
                                                onClick={() => markPresent(student.reg)}
                                            >
                                                <div className="w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 translate-x-0"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>


                    {/* Absent Students List */}
                    <div className="mt-6 p-4 w-11/12 md:w-10/12 bg-white shadow-lg rounded-lg">
                        <h2 className="text-lg font-bold text-blue-700">Absent Students:</h2>
                        <ul className="list-disc list-inside text-blue-600">
                            {absent_std.length > 0 ? absent_std.map((reg) => <li key={reg}>{reg}</li>) : <li>No absent students</li>}
                        </ul>
                    </div>



                    {/* Submission Button */}
                    <div className="button-box block">
                        <button
                            onClick={Calculate}
                            className="mt-4 px-4 w-[200px] text-center py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center gap-2"
                        >
                            <FontAwesomeIcon icon={faPaperPlane} />
                            Submit Record
                        </button>
                    </div>

                    {/* ================================= [ Attendance Pannel ] ============================================= */}




                </div>
            </div>


        </>
    );







}

export default Attendance
