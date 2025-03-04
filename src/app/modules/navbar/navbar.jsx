"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/app/assets/images/logo/AL1.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const showMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="bg-blue-800 border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center space-x-3">
            <span className="flex self-center text-2xl font-bold whitespace-nowrap text-white ml-5">
              <Image
                alt="logo"
                className="-mt-2 -ml-4"
                src={Logo}
                width={50}
                height={50}
                priority
              />
              Attendance Portal
            </span>
          </Link>
          <button
            onClick={showMenu}
            aria-expanded={isMenuOpen}
            className="p-2 w-10 h-10 inline-flex items-center justify-center text-white rounded-md md:hidden hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                d="M1 1h15M1 7h15M1 13h15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            className={`${isMenuOpen ? "block" : "hidden"
              } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="md:hidden font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-blue-800 md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 text-white rounded hover:bg-blue-400 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0"
                >
                  Attendance Mark
                </Link>
              </li>
              <li>
                <Link
                  href="/manageStudents"
                  className="block py-2 px-3 text-white rounded hover:bg-blue-400 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0"
                >
                  Manage Students
                </Link>
              </li>
              <li>
                <Link
                  href="/manageCourses"
                  className="block py-2 px-3 text-white rounded hover:bg-blue-400 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0"
                >
                  Manage Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block py-2 px-3 text-white rounded hover:bg-blue-400 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0"
                >
                  About
                </Link>
              </li>
              <li className="bg-white text-blue-800 rounded-md px-5 py-1 text-center">
                <Link
                  href="/history"
                  className="block py-2 px-3 rounded-md hover:text-blue-800 md:border-0 md:p-0"
                >
                  History
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
