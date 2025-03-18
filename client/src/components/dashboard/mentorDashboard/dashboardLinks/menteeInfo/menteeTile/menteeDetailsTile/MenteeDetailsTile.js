import React, { useState } from "react";
import DotIcon from "../../../../../../../assets/icons/DotIcon";

const MenteeDetailsTile = ({ mentee, semesters }) => {
    const [selectedSemester, setSelectedSemester] = useState(semesters[0]?._id || "");

    return (
        <div className="w-full p-6 rounded-lg mt-4 bg-white shadow-md transition-all duration-300 hover:shadow-lg">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-start gap-6">
                {/* Profile Image */}
                <div className="relative">
                    <img
                        className="w-28 h-28 rounded-full object-cover border-4 border-blue-50 shadow-sm transition-transform duration-300 hover:scale-105"
                        src={
                            mentee.avatar.url === ""
                                ? `https://api.dicebear.com/9.x/personas/svg`
                                : mentee.avatar.url
                        }
                        alt={`${mentee.firstname}'s avatar`}
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                        {mentee.semester}
                    </div>
                </div>

                {/* Basic Info */}
                <div className="flex flex-col flex-grow gap-y-2">
                    <h3 className="text-xl font-semibold text-gray-800 transition-colors duration-300">
                        {`${mentee.firstname} ${mentee.middlename} ${mentee.lastname}`}
                    </h3>
                    
                    <div className="flex items-center gap-x-3 text-gray-600">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            {mentee.email}
                        </span>
                        <DotIcon alt={true} myStyle={"h-1 w-1"} />
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            {mentee.phone_no}
                        </span>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-2"></div>
                    
                    {/* Academic Info */}
                    <div className="flex flex-wrap gap-6 text-sm">
                        <div className="transition-all duration-300 hover:translate-y-1">
                            <p className="text-xs uppercase text-gray-400 font-medium tracking-wider">Department</p>
                            <p className="font-medium text-gray-700">{mentee.department}</p>
                        </div>
                        <div className="transition-all duration-300 hover:translate-y-1">
                            <p className="text-xs uppercase text-gray-400 font-medium tracking-wider">Programme</p>
                            <p className="font-medium text-gray-700">{mentee.programme}</p>
                        </div>
                        <div className="transition-all duration-300 hover:translate-y-1">
                            <p className="text-xs uppercase text-gray-400 font-medium tracking-wider">Enrolled</p>
                            <p className="font-medium text-gray-700">{mentee.enrollment_year}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Personal Details Panel */}
                <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg transition-all duration-300 hover:bg-gray-100">
                    <h4 className="font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        Personal Details
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="transition-all duration-300 hover:translate-x-1">
                            <p className="text-xs uppercase text-gray-400 font-medium tracking-wider">Address</p>
                            <p className="font-medium text-gray-700">{mentee.address}</p>
                        </div>
                        <div className="transition-all duration-300 hover:translate-x-1">
                            <p className="text-xs uppercase text-gray-400 font-medium tracking-wider">Gender</p>
                            <p className="font-medium text-gray-700">{mentee.gender}</p>
                        </div>
                        <div className="transition-all duration-300 hover:translate-x-1">
                            <p className="text-xs uppercase text-gray-400 font-medium tracking-wider">Blood Group</p>
                            <p className="font-medium text-gray-700">{mentee.blood_group}</p>
                        </div>
                        <div className="transition-all duration-300 hover:translate-x-1">
                            <p className="text-xs uppercase text-gray-400 font-medium tracking-wider">Home Place</p>
                            <p className="font-medium text-gray-700">{mentee.home_place}</p>
                        </div>
                        <div className="transition-all duration-300 hover:translate-x-1">
                            <p className="text-xs uppercase text-gray-400 font-medium tracking-wider">Hobbies</p>
                            <p className="font-medium text-gray-700">{mentee.hobbies}</p>
                        </div>
                        <div className="transition-all duration-300 hover:translate-x-1">
                            <p className="text-xs uppercase text-gray-400 font-medium tracking-wider">Family Details</p>
                            <p className="font-medium text-gray-700">{mentee.family_details}</p>
                        </div>
                    </div>

                    {/* Guardian Information */}
                    <h4 className="font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-4 mt-6 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        Guardian Information
                    </h4>
                    
                    <div className="grid grid-cols-1 gap-4">
                        <div className="transition-all duration-300 hover:translate-x-1">
                            <p className="text-xs uppercase text-gray-400 font-medium tracking-wider">Name</p>
                            <p className="font-medium text-gray-700">{mentee.guardian_name}</p>
                        </div>
                        <div className="transition-all duration-300 hover:translate-x-1">
                            <p className="text-xs uppercase text-gray-400 font-medium tracking-wider">Phone Number</p>
                            <p className="font-medium text-gray-700">{mentee.guardian_ph_no}</p>
                        </div>
                        <div className="transition-all duration-300 hover:translate-x-1">
                            <p className="text-xs uppercase text-gray-400 font-medium tracking-wider">Address</p>
                            <p className="font-medium text-gray-700">{mentee.guardian_address}</p>
                        </div>
                    </div>

                    {/* Residence Information */}
                    <h4 className="font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-4 mt-6 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                        {mentee.hostel_name === "" ? "Residence Information" : "Hostel Information"}
                    </h4>
                    
                    <div className="grid grid-cols-1 gap-4">
                        {mentee.hostel_name === "" ? (
                            <>
                                <div className="transition-all duration-300 hover:translate-x-1">
                                    <p className="text-xs uppercase text-gray-400 font-medium tracking-wider">Residence Address</p>
                                    <p className="font-medium text-gray-700">{mentee.residence_address}</p>
                                </div>
                                <div className="transition-all duration-300 hover:translate-x-1">
                                    <p className="text-xs uppercase text-gray-400 font-medium tracking-wider">Contact Person</p>
                                    <p className="font-medium text-gray-700">{mentee.responsible_contact_person_at_residence}</p>
                                </div>
                                <div className="transition-all duration-300 hover:translate-x-1">
                                    <p className="text-xs uppercase text-gray-400 font-medium tracking-wider">Contact Number</p>
                                    <p className="font-medium text-gray-700">{mentee.contact_no_of_contact_person}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="transition-all duration-300 hover:translate-x-1">
                                    <p className="text-xs uppercase text-gray-400 font-medium tracking-wider">Hostel Name</p>
                                    <p className="font-medium text-gray-700">{mentee.hostel_name}</p>
                                </div>
                                <div className="transition-all duration-300 hover:translate-x-1">
                                    <p className="text-xs uppercase text-gray-400 font-medium tracking-wider">Warden Name</p>
                                    <p className="font-medium text-gray-700">{mentee.warden_name}</p>
                                </div>
                                <div className="transition-all duration-300 hover:translate-x-1">
                                    <p className="text-xs uppercase text-gray-400 font-medium tracking-wider">Warden Phone</p>
                                    <p className="font-medium text-gray-700">{mentee.warden_ph_no}</p>
                                </div>
                                <div className="transition-all duration-300 hover:translate-x-1">
                                    <p className="text-xs uppercase text-gray-400 font-medium tracking-wider">Asst. Warden Name</p>
                                    <p className="font-medium text-gray-700">{mentee.asst_warden_name}</p>
                                </div>
                                <div className="transition-all duration-300 hover:translate-x-1">
                                    <p className="text-xs uppercase text-gray-400 font-medium tracking-wider">Asst. Warden Phone</p>
                                    <p className="font-medium text-gray-700">{mentee.asst_warden_ph_no}</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Academic Details Panel */}
                <div className="md:col-span-2 bg-white rounded-lg border border-gray-100 transition-all duration-300 shadow-sm hover:shadow">
                    <div className="border-b border-gray-100 p-4">
                    <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                            </svg>
                            Semester Performance
                        </h4>
                    </div>

                    {/* Semester Tabs */}
                    <div className="flex overflow-x-auto p-2 gap-2 border-b border-gray-100">
                        {semesters.map((semester) => (
                            <button
                                key={semester._id}
                                onClick={() => setSelectedSemester(semester._id)}
                                className={`px-4 py-2 text-sm rounded-md whitespace-nowrap transition-all duration-300 focus:outline-none ${
                                    selectedSemester === semester._id
                                        ? "bg-blue-500 text-white font-medium shadow-sm"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                Semester {semester.semester}
                            </button>
                        ))}
                    </div>

                    {/* Semester Content */}
                    <div className="p-4">
                        {semesters.map((semester) => (
                            <div
                                key={semester._id}
                                className={`transition-opacity duration-300 ${
                                    selectedSemester === semester._id ? "opacity-100" : "hidden opacity-0"
                                }`}
                            >
                                <div className="overflow-x-auto rounded-lg border border-gray-100">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Code</th>
                                                <th scope="col" className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">Title</th>
                                                <th scope="col" className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Credit</th>
                                                <th scope="col" className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Type</th>
                                                <th scope="col" className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Grade</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {semester.courses.map((course, index) => (
                                                <tr 
                                                    key={index}
                                                    className="transition-colors duration-300 hover:bg-blue-50"
                                                >
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center font-medium text-gray-900">{course.code}</td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{course.title}</td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">{course.credit}</td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            course.type === 'Core' ? 'bg-green-100 text-green-800' : 
                                                            course.type === 'Elective' ? 'bg-blue-100 text-blue-800' : 
                                                            'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {course.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-lg ${
                                                            course.grade === 'A' || course.grade === 'A+' ? 'bg-green-100 text-green-800' : 
                                                            course.grade === 'B' || course.grade === 'B+' ? 'bg-blue-100 text-blue-800' : 
                                                            course.grade === 'C' || course.grade === 'C+' ? 'bg-yellow-100 text-yellow-800' : 
                                                            course.grade === 'D' || course.grade === 'D+' ? 'bg-orange-100 text-orange-800' : 
                                                            course.grade === 'F' ? 'bg-red-100 text-red-800' : 
                                                            'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {course.grade}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                
                                {/* Performance Summary */}
                                <div className="mt-4 flex flex-wrap gap-4 justify-between">
                                    <div className="bg-blue-50 rounded-lg p-3 flex-1 min-w-max transition-transform duration-300 hover:scale-105">
                                        <p className="text-xs text-blue-500 font-semibold">Total Credits</p>
                                        <p className="text-xl font-bold text-blue-700">
                                            {semester.courses.reduce((sum, course) => sum + parseFloat(course.credit), 0).toFixed(1)}
                                        </p>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-3 flex-1 min-w-max transition-transform duration-300 hover:scale-105">
                                        <p className="text-xs text-green-500 font-semibold">Pass Percentage</p>
                                        <p className="text-xl font-bold text-green-700">
                                            {(semester.courses.filter(c => c.grade !== 'F').length / semester.courses.length * 100).toFixed(0)}%
                                        </p>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-3 flex-1 min-w-max transition-transform duration-300 hover:scale-105">
                                        <p className="text-xs text-purple-500 font-semibold">Courses</p>
                                        <p className="text-xl font-bold text-purple-700">
                                            {semester.courses.length}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenteeDetailsTile;