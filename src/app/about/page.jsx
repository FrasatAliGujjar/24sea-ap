"use client"

import React from "react";

const About = () => {

    // ===================================== [ Whatsapp Connection ] =================================================

    const sendToWhatsApp = () => {
        const phoneNumber = "+923419385624";

        const message = encodeURIComponent(
            `*Asslam-o-Alaikum !*\n\n` +
            `*Sir. Frasat Ali Gujjar*\n\n` +
            `*__________________________*\n\n` +
            `My Name is ...\n\n`
        );

        const url = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(url, "_blank");
    };

    // ===================================== [ Whatsapp Connection ] =================================================


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center p-5">
            <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-8">
                <h1 className="text-3xl font-bold text-center text-blue-900">About Us</h1>
                <p className="mt-4 text-lg text-gray-700 text-center">
                    Welcome to the official Attendance Portal for <span className="font-semibold text-blue-600">Class SE-6A</span>,
                    Department of <span className="font-semibold text-blue-600">DCS</span>, at
                    <span className="font-semibold text-blue-600"> National Textile University</span>. This portal helps students
                    and faculty track attendance efficiently with a user-friendly interface.
                </p>

                {/* Developers Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-blue-800 text-center">Meet the Developers</h2>
                    <div className="flex justify-center gap-6 mt-6">
                        <div onClick={sendToWhatsApp} className="p-4 bg-blue-100 rounded-lg shadow-md text-center">
                            <h3 className="text-lg font-semibold text-blue-900">Frasat Ali Gujjar</h3>
                            {/* <p className="text-gray-600">Lead Developer</p> */}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-gray-600">
                        © {new Date().getFullYear()} | Frasat Ali Gujjar | NTU
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
