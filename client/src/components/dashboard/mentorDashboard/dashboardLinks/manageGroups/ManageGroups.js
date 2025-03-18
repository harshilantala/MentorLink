import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ManageGroups.css";

import {
    adminAssignMentees,
    adminGetMentorMentee,
    adminRemoveMentees,
    adminSaveGroup,
} from "../../../../../actions/admin";

import MentorTile from "./MentorTile";
import SearchIcon from "../../../../../assets/icons/SearchIcon";
import AcademicCapIcon from "../../../../../assets/icons/AcademicCapIcon";
import MentorIcon from "../../../../../assets/icons/MentorIcon";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ModalOverlay from "../../../../modal/ModalOverlay";
import AssignModal from "./manageGroupModals/AssignModal";
import ViewModal from "./manageGroupModals/ViewModal";

// Import CSS for transitions (you'll need to create this)
// import "./ManageGroups.css";

const ManageGroups = () => {
    const dispatch = useDispatch();

    // accessing global state for fetching the list of mentors and mentees
    const {
        mentorMenteeDetails: { mentors, students },
    } = useSelector((state) => state.admin);

    // fetching mentor mentee details
    useEffect(() => {
        dispatch(adminGetMentorMentee());
    }, [dispatch]);

    // state variable to save the group state and send to the backend
    const [group, setGroup] = useState({
        mentorId: "",
        studentIds: [],
    });

    // state variables
    const [assignMentees, setAssignMentees] = useState([]);
    const [viewMentees, setViewMentees] = useState([]);
    const [selectedMentor, setSelectedMentor] = useState(undefined);
    const [searchQuery, setSearchQuery] = useState("");

    // states for modals
    const [showOverlay, setShowOverlay] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    // noderefs for modal
    const overlayRef = useRef(null);
    const assignModalRef = useRef(null);
    const viewModalRef = useRef(null);

    // function to handle assign
    const handleAssign = () => {
        let newMentees = [];
        newMentees = students.filter(
            (student) => student.mentoredBy === "" || student.mentoredBy === undefined
        );
        setAssignMentees(newMentees);
        setShowOverlay(true);
        setShowAssignModal(true);
    };

    // function to handle view
    const handleView = (mentorId) => {
        let newMentees = [];
        newMentees = students.filter(
            (student) =>
                student.mentoredBy !== undefined &&
                student.mentoredBy.toString() === mentorId.toString()
        );
        setViewMentees(newMentees);
        setShowOverlay(true);
        setShowViewModal(true);
    };

    // function to handle assign selection
    const handleSelection = (mid, sid) => {
        if (group.studentIds.includes(sid)) {
            let newGroup = group.studentIds.filter((id) => id !== sid.toString());
            setGroup({
                mentorId: mid,
                studentIds: newGroup,
            });
        } else {
            setGroup({
                mentorId: mid,
                studentIds: [...group.studentIds, sid],
            });
        }
    };

    // function to handle save group
    const handleAssignMentees = () => {
        dispatch(adminAssignMentees(group));
        setShowOverlay(false);
        setShowAssignModal(false);
        setGroup({
            mentorId: "",
            studentIds: [],
        });
    };

    // function to handle save group
    const handleRemoveMentees = () => {
        dispatch(adminRemoveMentees(group));
        setShowOverlay(false);
        setShowViewModal(false);
        setGroup({
            mentorId: "",
            studentIds: [],
        });
    };

    // Filter mentors based on search query
    const filteredMentors = mentors?.filter(mentor => 
        mentor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.department?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-full w-full p-6 bg-gray-50 relative fade-in">
            <CSSTransition
                nodeRef={overlayRef}
                in={showOverlay}
                timeout={300}
                classNames="overlay"
                unmountOnExit
            >
                <ModalOverlay nodeRef={overlayRef} />
            </CSSTransition>
            <CSSTransition
                nodeRef={assignModalRef}
                in={showAssignModal}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <AssignModal
                    nodeRef={assignModalRef}
                    assignMentees={assignMentees}
                    setShowOverlay={setShowOverlay}
                    setShowAssignModal={setShowAssignModal}
                    selectedMentor={selectedMentor}
                    group={group}
                    handleSelection={handleSelection}
                    setGroup={setGroup}
                    handleAssignMentees={handleAssignMentees}
                />
            </CSSTransition>
            <CSSTransition
                nodeRef={viewModalRef}
                in={showViewModal}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <ViewModal
                    nodeRef={viewModalRef}
                    viewMentees={viewMentees}
                    setShowOverlay={setShowOverlay}
                    setShowViewModal={setShowViewModal}
                    selectedMentor={selectedMentor}
                    group={group}
                    handleSelection={handleSelection}
                    setGroup={setGroup}
                    handleRemoveMentees={handleRemoveMentees}
                />
            </CSSTransition>

            <div className="max-w-7xl mx-auto">
                {/* Header section */}
                <div className="mb-8 slide-in-bottom">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Manage Mentor Groups</h2>
                    <p className="text-gray-600">Assign mentees to mentors and manage existing groups</p>
                </div>
                
                {/* Stats and search section */}
                <div className="w-full mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 slide-in-bottom" style={{ animationDelay: "0.1s" }}>
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex justify-start items-center p-5 bg-white shadow-sm rounded-lg gap-x-4 border border-gray-100 hover-lift">
                            <div className="rounded-full p-3 bg-blue-100">
                                <MentorIcon alt={true} myStyle={"h-5 w-5 text-blue-600"} />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-2xl font-semibold">{mentors?.length || 0}</h3>
                                <h5 className="text-gray-500">Total Mentors</h5>
                            </div>
                        </div>
                        
                        <div className="flex justify-start items-center p-5 bg-white shadow-sm rounded-lg gap-x-4 border border-gray-100 hover-lift">
                            <div className="rounded-full p-3 bg-orange-100">
                                <AcademicCapIcon alt={true} myStyle={"text-orange-500 w-5 h-5"} />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-2xl font-semibold">{students?.length || 0}</h3>
                                <h5 className="text-gray-500">Total Mentees</h5>
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full md:w-auto mt-4 md:mt-0">
                        <div className="relative">
                            <input
                                onChange={(e) => setSearchQuery(e.target.value)}
                                value={searchQuery}
                                type="text"
                                className="pl-11 pr-4 py-3 rounded-lg xl:w-96 border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                placeholder="Search by name or department..."
                            />
                            <div className="absolute top-3.5 left-3">
                                <SearchIcon alt={true} myStyle={"h-5 w-5 text-gray-400"} />
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Mentors grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-full overflow-y-auto pb-8">
                    <TransitionGroup component={null}>
                        {filteredMentors?.map((mentor, index) => (
                            <CSSTransition
                                key={mentor._id}
                                timeout={500}
                                classNames="mentor-card"
                            >
                                <div className="slide-in-bottom" style={{ animationDelay: `${index * 0.05}s` }}>
                                    <MentorTile
                                        mentor={mentor}
                                        handleAssign={handleAssign}
                                        handleView={handleView}
                                        setSelectedMentor={setSelectedMentor}
                                    />
                                </div>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                    
                    {filteredMentors?.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-sm border border-gray-100 fade-in">
                            <div className="text-gray-400 mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-700">No mentors found</h3>
                            <p className="text-gray-500 mt-1">Try adjusting your search criteria</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageGroups;