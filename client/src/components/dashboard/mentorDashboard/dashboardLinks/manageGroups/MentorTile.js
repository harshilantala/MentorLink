import React from "react";
import { Abbreviate } from "../../../../../utility";
import Chip from "./Chip";

const MentorTile = ({ mentor, handleAssign, setSelectedMentor, handleView }) => {
    const handleActionViewModal = () => {
        setSelectedMentor(mentor);
        handleView(mentor._id);
    };

    const handleActionAssignModal = () => {
        setSelectedMentor(mentor);
        handleAssign();
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover-lift transition-all duration-300">
            <div className="flex items-center justify-start mb-4 gap-x-4">
                <div className="relative">
                    <img
                        className="h-20 w-20 rounded-full object-cover border-2 border-gray-100"
                        src={
                            mentor.avatar.url === ""
                                ? `https://api.dicebear.com/9.x/personas/svg?seed=${mentor.email}`
                                : mentor.avatar.url
                        }
                        alt={`${mentor.firstName} ${mentor.lastName}`}
                    />
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white font-semibold border-2 border-white">
                        {mentor.studentCount}
                    </div>
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 text-lg">{`${mentor.firstName} ${mentor.middleName} ${mentor.lastName}`}</h4>
                    <div className="flex flex-col text-gray-500 mt-1">
                        <span className="text-sm flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            {mentor.phone}
                        </span>
                        <span className="text-sm flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            {mentor.email}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
                <Chip name={`${mentor.designation}`} myStyle={"bg-gray-100 text-gray-800"} />
                <Chip name={Abbreviate(mentor.department)} myStyle={"bg-blue-100 text-blue-800"} />
            </div>
            <div className="flex items-center justify-between gap-x-3 pt-3 border-t border-gray-100">
                <button
                    onClick={handleActionAssignModal}
                    className="rounded-md w-full px-3 py-2 bg-green-50 border border-green-600 text-green-600 text-sm hover:bg-green-600 hover:text-white transition-colors btn-hover font-medium"
                >
                    Assign Mentees
                </button>
                <button
                    onClick={handleActionViewModal}
                    className="rounded-md w-full px-3 py-2 bg-blue-50 border border-blue-600 text-blue-600 text-sm hover:bg-blue-600 hover:text-white transition-colors btn-hover font-medium"
                >
                    View Group
                </button>
            </div>
        </div>
    );
};

export default MentorTile;