"use client"
// -------------------------------------------------------------------------------
import React, { useState } from 'react'
import Image from "next/image";
import logo from "../../assets/images/logo/AL1.png";
import home from "../../assets/images/home-2.png";
import teacher from "../../assets/images/teacher.png";
import attend_mark from "../../assets/images/attendance_mark.png";
import SideBar_Style from "./sidebar.module.css";
import Link from 'next/link';
// -------------------------------------------------------------------------------
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faChalkboardTeacher, faGraduationCap, faArrowLeft, faHistory, faUserGraduate, faUserShield, faArrowRight, faBars, faTachometerAlt, faEnvelope, faInfoCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
// -------------------------------------------------------------------------------


const Sidebar = () => {

    const [menu, setMenu] = useState(true);

    return (
        <>
            {/* ============================== */}
            <div
                className={`border-1 border-red-600 hidden md:block dashboard h-lvh w-[20%] bg-[#152259]  flex-col justify-start items-center ${menu ? SideBar_Style.show : SideBar_Style.hide}`}
            >

                {/* Logo Section */}
                <div className="logo-container flex flex-col justify-center items-center  py-4">
                    <div>
                        {
                            (menu) ?
                                <FontAwesomeIcon title='Close' onClick={() => setMenu(!menu)} className='ml-[190px] text-slate-200' icon={faArrowLeft} size="1x" style={{ cursor: 'pointer' }} />
                                :
                                <FontAwesomeIcon title='Open' onClick={() => setMenu(!menu)} className='ml-[210px] text-slate-200' icon={faBars} size="1x" style={{ cursor: 'pointer' }} />

                        }
                    </div>
                    <div className="logo h-[65px] w-[100px] flex justify-center">
                        <Image
                            src={logo}
                            height={65}
                            width={65}
                            alt="logo"
                            className="rounded-full"
                        />
                    </div>
                    <span className="text-center text-white mt-2 text-sm sm:text-xs">
                        Attendance Portal
                    </span>
                </div>
                <hr className="border-t-2 border-gray-400 w-full my-2" />
                {/* Menu Section */}
                <div className="menu h-full w-full flex flex-col justify-start items-start p-3">
                    {/* ======================================= */}
                    {/* <div className="rounded-md menu-item w-full flex  items-center py-2 hover:bg-blue-400 cursor-pointer">

                        <FontAwesomeIcon icon={faTachometerAlt} className='ml-4 text-slate-200' />

                        <span className="text-[#FFFFFF] ml-2 text-sm sm:text-xs">
                            <Link href='/dashboard'>
                                Dashboard
                            </Link>
                        </span>
                    </div> */}
                    {/* ======================================= */}
                    <div className="rounded-md menu-item w-full flex items-center py-2 hover:bg-blue-400 cursor-pointer mt-1">

                        <FontAwesomeIcon icon={faCheckCircle} className='ml-4 text-slate-200' />

                        <span className="text-[#FFFFFF] ml-2 text-sm sm:text-xs">
                            <Link href='/'>
                                Attendance Mark
                            </Link>
                        </span>
                    </div>
                    {/* ======================================= */}
                    {/* <div className="rounded-md menu-item w-full flex items-center py-2 hover:bg-blue-400 cursor-pointer mt-1">

                        <FontAwesomeIcon icon={faEnvelope} className='ml-4 text-slate-200' />

                        <span className="text-[#FFFFFF] ml-2 text-sm sm:text-xs">
                            <Link href='/contact'>
                                Contact us
                            </Link>
                        </span>
                    </div> */}
                    {/* ======================================= */}
                    <div className="rounded-md menu-item w-full flex items-center py-2 hover:bg-blue-400 cursor-pointer mt-1">

                        <FontAwesomeIcon icon={faUserGraduate} className='ml-4 text-slate-200' />

                        <span className="text-[#FFFFFF] ml-2 text-sm sm:text-xs">
                            <Link href='/manageStudents'>
                                Student Manager
                            </Link>
                        </span>
                    </div>
                    {/* ======================================= */}
                    <div className="rounded-md menu-item w-full flex items-center py-2 hover:bg-blue-400 cursor-pointer mt-1">

                        <FontAwesomeIcon icon={faBook} className='ml-4 text-slate-200' />

                        <span className="text-[#FFFFFF] ml-2 text-sm sm:text-xs">
                            <Link href='/manageCourses'>
                                Course Manager
                            </Link>
                        </span>
                    </div>
                    {/* ======================================= */}
                    <div className="rounded-md menu-item w-full flex items-center py-2 hover:bg-blue-400 cursor-pointer mt-1">

                        <FontAwesomeIcon icon={faHistory} className='ml-4 text-slate-200' />

                        <span className="text-[#FFFFFF] ml-2 text-sm sm:text-xs">
                            <Link href='/history'>
                                History
                            </Link>
                        </span>
                    </div>
                    {/* ======================================= */}
                    <div className="rounded-md menu-item w-full flex items-center py-2 hover:bg-blue-400 cursor-pointer mt-1">

                        <FontAwesomeIcon icon={faInfoCircle} className='ml-4 text-slate-200' />

                        <span className="text-[#FFFFFF] ml-2 text-sm sm:text-xs">
                            <Link href='/about'>
                                About us
                            </Link>
                        </span>
                    </div>
                    {/* ======================================= */}
                </div>
            </div>
            {/* ============================== */}
        </>
    )
}

export default Sidebar
