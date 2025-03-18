import React, { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { authContext } from "../../../../../contexts/authContext";
import { Roles } from "../../../../../utility";
import MeetingForm from "./meetingForm/MeetingForm";
import MeetingTile from "./meetingTile/MeetingTile";

const Meetings = () => {
    // getting user role
    const { role } = useContext(authContext);
    // global meeting state
    const { meetings } = useSelector((state) => state.meeting);

    // meeting state
    const [meeting, setMeeting] = useState({
        id: "",
        participants: [],
        description: "",
        url: "",
        date: null,
        minutes: "",
    });

    // For animation purposes
    const [mounted, setMounted] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    const sortedMeetings = [...(meetings || [])].sort((a, b) => {
        return a.createdAt < b.createdAt ? 1 : -1;
    });
    
    // Group meetings by month/year for better organization
    const groupedMeetings = sortedMeetings.reduce((groups, meet) => {
        const date = new Date(meet.date || meet.createdAt);
        const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
        
        if (!groups[monthYear]) {
            groups[monthYear] = [];
        }
        
        groups[monthYear].push(meet);
        return groups;
    }, {});

    return (
      <div className="flex flex-col w-full gap-6 p-6 max-w-7xl bg-gradient-to-br from-blue-50 to-indigo-50 h-full rounded-xl">
            <div className="flex-1 bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ease-in-out transform hover:shadow-xl">
                <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <h2 className="text-xl font-bold text-gray-800">All Meetings</h2>
                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                            {meetings.length}
                        </span>
                    </div>
                    
                    <div className="flex space-x-2">
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-full transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-full transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div className="p-6 overflow-y-auto max-h-[calc(100vh-10rem)]">
                    {Object.keys(groupedMeetings).length > 0 ? (
                        Object.keys(groupedMeetings).map((monthYear, groupIndex) => (
                            <div 
                                key={monthYear} 
                                className={`mb-8 transition-all duration-500 ease-in-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                style={{ transitionDelay: `${groupIndex * 100}ms` }}
                            >
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">{monthYear}</h3>
                                <div className="space-y-4">
                                    {groupedMeetings[monthYear].map((meet, index) => (
                                        <div 
                                            key={meet._id} 
                                            className={`transition-all duration-500 ease-in-out transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${selectedMeeting === meet._id ? 'ring-2 ring-indigo-500' : ''}`}
                                            style={{ transitionDelay: `${(groupIndex * 100) + (index * 50)}ms` }}
                                            onClick={() => {
                                                setSelectedMeeting(meet._id);
                                                setMeeting(meet);
                                            }}
                                        >
                                            <MeetingTile {...meet} setMeeting={setMeeting} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-xl font-medium">No meetings found</p>
                            <p className="text-sm mt-2">Create your first meeting to get started</p>
                        </div>
                    )}
                </div>
            </div>
            
            {role === Roles.MENTOR && (
                <div 
                    className={`w-full lg:w-96 bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-700 ease-in-out transform ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                    style={{ transitionDelay: '200ms' }}
                >
                    <MeetingForm meeting={meeting} setMeeting={setMeeting} />
                </div>
            )}
        </div>
    );
};

export default Meetings;