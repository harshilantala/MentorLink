import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CSSTransition } from "react-transition-group";
import { mentorGetProfile } from "../../../../../actions/mentor";
import { studentGetProfileDetails } from "../../../../../actions/student";

import AcademicCapIcon from "../../../../../assets/icons/AcademicCapIcon";
import OfficeBuildingIcon from "../../../../../assets/icons/OfficeBuildingIcon";
import PencilIcon from "../../../../../assets/icons/PencilIcon";
import PhoneIcon from "../../../../../assets/icons/PhoneIcon";
import TrashIcon from "../../../../../assets/icons/TrashIcon";
import UploadIcon from "../../../../../assets/icons/UploadIcon";
import UserCircleIcon from "../../../../../assets/icons/UserCircleIcon";
import UserGroupIcon from "../../../../../assets/icons/UserGroupIcon";

import ModalOverlay from "../../../../modal/ModalOverlay";
import ProfilePicDelModal from "./profilePicModal/ProfilePicDelModal";
import ProfilePicModal from "./profilePicModal/ProfilePicModal";
import ProfileModal from "./ProfileModal";
import StuModal from "./stuModal/StuModal";
import { Roles } from "../../../../../utility";
import { authContext } from "../../../../../contexts/authContext";

const Profile = ({ profileData }) => {
    // getting uid of the logged in user
    const { role } = useContext(authContext);

    const dispatch = useDispatch();
    const history = useHistory();

    // States for animation effects
    const [cardLoaded, setCardLoaded] = useState(false);
    const [contentLoaded, setContentLoaded] = useState(false);

    // function to fetch profile data for the mentor
    useEffect(() => {
        if (role === Roles.MENTOR) {
            dispatch(mentorGetProfile(history));
        } else if (role === Roles.STUDENT) {
            dispatch(studentGetProfileDetails(history));
        }
        
        // Animation sequence
        setTimeout(() => setCardLoaded(true), 100);
        setTimeout(() => setContentLoaded(true), 500);
    }, []);

    // accessing the global state for the mentor profile data
    // const { profileData } = useSelector((state) => state.mentor);

    // state for the modal field values
    const [mentorProfileData, setMentorProfileData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        department: "",
        designation: "",
        studentCount: 0,
    });

    // state to store the profile data fetched from the api
    const [stuProfileData, setStuProfileData] = useState({
        department: "",
        programme: "",
        semester: "",
        enrollment_no: "",
        enrollment_year: "",
        phone_no: "",
        address: "",
        firstname: "",
        middlename: "",
        lastname: "",
        gender: "",
        blood_group: "",
        home_place: "",
        hobbies: "",
        guardian_name: "",
        guardian_ph_no: "",
        guardian_address: "",
        family_details: "",
        hostel_name: "",
        warden_name: "",
        asst_warden_name: "",
        warden_ph_no: "",
        asst_warden_ph_no: "",
        responsible_contact_person_at_residence: "",
        contact_no_of_contact_person: "",
        residence_address: "",
    });

    // state for modals show and hide
    const [showOverlay, setShowOverlay] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [hiddenProfilePicDelModal, setHiddenProfilePicDelModal] = useState(false);
    const [hiddenProfilePicModal, setHiddenProfilePicModal] = useState(false);
    const [showStuProfileModal, setShowStuProfileModal] = useState(false);

    // refs used for css transition to work for the modal and the overlay
    const editModalRef = useRef(null);
    const overlayRef = useRef(null);
    const profilePicEditModalOverlay = useRef(null);
    const profilePicDeleteModalRef = useRef(null);
    const stuProfileModalRef = useRef(null);

    // function to handle modal show hide
    const handleShowModal = () => {
        setShowOverlay(true);
        if (role === Roles.MENTOR) {
            setShowEditModal(true);
            setMentorProfileData({
                firstName: profileData.firstName ? profileData.firstName : "",
                middleName: profileData.middleName ? profileData.middleName : "",
                lastName: profileData.lastName ? profileData.lastName : "",
                email: profileData.email ? profileData.email : "",
                phone: profileData.phone ? profileData.phone : "",
                address: profileData.address ? profileData.address : "",
                department: profileData.department ? profileData.department : "",
                designation: profileData.designation ? profileData.designation : "",
                studentCount: profileData.studentCount ? profileData.studentCount : 0,
            });
        } else if (role === Roles.STUDENT) {
            setShowStuProfileModal(true);
            setStuProfileData({
                department: profileData.department ? profileData.department : "",
                programme: profileData.programme ? profileData.programme : "",
                semester: profileData.semester ? profileData.semester : "",
                enrollment_no: profileData.enrollment_no ? profileData.enrollment_no : "",
                enrollment_year: profileData.enrollment_year ? profileData.enrollment_year : "",
                phone_no: profileData.phone_no ? profileData.phone_no : "",
                address: profileData.address ? profileData.address : "",
                firstName: profileData.firstName ? profileData.firstName : "",
                middleName: profileData.middleName ? profileData.middleName : "",
                lastName: profileData.lastName ? profileData.lastName : "",
                gender: profileData.gender ? profileData.gender : "",
                blood_group: profileData.blood_group ? profileData.blood_group : "",
                home_place: profileData.home_place ? profileData.home_place : "",
                hobbies: profileData.hobbies ? profileData.hobbies : "",
                guardian_name: profileData.guardian_name ? profileData.guardian_name : "",
                guardian_ph_no: profileData.guardian_ph_no ? profileData.guardian_ph_no : "",
                guardian_address: profileData.guardian_address ? profileData.guardian_address : "",
                family_details: profileData.family_details ? profileData.family_details : "",
                hostel_name: profileData.hostel_name ? profileData.hostel_name : "",
                warden_name: profileData.warden_name ? profileData.warden_name : "",
                asst_warden_name: profileData.asst_warden_name ? profileData.asst_warden_name : "",
                warden_ph_no: profileData.warden_ph_no ? profileData.warden_ph_no : "",
                asst_warden_ph_no: profileData.asst_warden_ph_no
                    ? profileData.asst_warden_ph_no
                    : "",
                responsible_contact_person_at_residence:
                    profileData.responsible_contact_person_at_residence
                        ? profileData.responsible_contact_person_at_residence
                        : "",
                contact_no_of_contact_person: profileData.contact_no_of_contact_person
                    ? profileData.contact_no_of_contact_person
                    : "",
                residence_address: profileData.residence_address
                    ? profileData.residence_address
                    : "",
            });
        }
    };

    // Helper function for card transition styles
    const getCardTransitionClass = (index) => {
        return cardLoaded 
            ? `opacity-100 translate-y-0 transition-all duration-500 ease-out delay-${index * 100}`
            : "opacity-0 translate-y-8 transition-all duration-500 ease-out";
    };

    // Helper function for content transition styles
    const getContentTransitionClass = (index) => {
        return contentLoaded 
            ? `opacity-100 translate-x-0 transition-all duration-300 ease-out delay-${index * 75}`
            : "opacity-0 -translate-x-4 transition-all duration-300 ease-out";
    };

    return (
        <div
            className={`w-full h-full ${role === Roles.MENTOR ? "flex items-center justify-center" : "p-4"} 
                        relative bg-gradient-to-br from-blue-50 to-indigo-50`}
        >
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
                nodeRef={profilePicEditModalOverlay}
                in={hiddenProfilePicModal}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <ProfilePicModal
                    setShowOverlay={setShowOverlay}
                    setHiddenProfilePicModal={setHiddenProfilePicModal}
                    nodeRef={profilePicEditModalOverlay}
                />
            </CSSTransition>
            <CSSTransition
                nodeRef={profilePicDeleteModalRef}
                in={hiddenProfilePicDelModal}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <ProfilePicDelModal
                    setShowOverlay={setShowOverlay}
                    setHiddenProfilePicDelModal={setHiddenProfilePicDelModal}
                    nodeRef={profilePicDeleteModalRef}
                />
            </CSSTransition>

            {role === Roles.MENTOR && (
                <CSSTransition
                    nodeRef={editModalRef}
                    in={showEditModal}
                    timeout={300}
                    classNames="modal"
                    unmountOnExit
                >
                    <ProfileModal
                        nodeRef={editModalRef}
                        mentorProfileData={mentorProfileData}
                        setMentorProfileData={setMentorProfileData}
                        setShowOverlay={setShowOverlay}
                        setShowEditModal={setShowEditModal}
                    />
                </CSSTransition>
            )}
            {role === Roles.MENTOR && (
                <div className="w-3/5 max-w-5xl">
                    <div className={`text-3xl font-bold text-gray-800 mb-8 ${getContentTransitionClass(0)}`}>
                        Profile Dashboard
                    </div>
                    <div className="flex gap-x-6 mb-6">
                        <div className={`bg-white px-6 py-8 shadow-lg rounded-xl flex-shrink-0 border border-gray-100 ${getCardTransitionClass(1)}`}>
                            <h3 className="mb-6 text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                                Profile Photo
                                <UserCircleIcon alt={false} myStyle={"h-5 w-5 ml-2 text-blue-500"} />
                            </h3>
                            <div className="flex flex-col items-center gap-y-4">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-blue-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                    <img
                                        className="w-40 h-40 rounded-full object-cover border-4 border-blue-100 shadow-md hover:shadow-xl transition-shadow duration-300"
                                        src={
                                            profileData?.avatar?.url === ""
                                                ? `https://api.dicebear.com/9.x/personas/svg`
                                                : profileData?.avatar?.url
                                        }
                                        alt="Profile"
                                    />
                                </div>
                                <div className="flex gap-x-3 mt-2">
                                    <button
                                        onClick={() => {
                                            setHiddenProfilePicModal(true);
                                            setShowOverlay(true);
                                        }}
                                        className="p-2 bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-lg text-white flex items-center text-sm shadow-md hover:shadow-lg transform hover:-translate-y-1"
                                    >
                                        <UploadIcon alt={false} myStyle={"h-4 w-4 mr-2"} />
                                        Change
                                    </button>
                                    <button
                                        onClick={() => {
                                            setHiddenProfilePicDelModal(true);
                                            setShowOverlay(true);
                                        }}
                                        className="p-2 bg-white border border-red-500 text-red-500 rounded-lg flex items-center text-sm hover:bg-red-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                                    >
                                        <TrashIcon alt={false} myStyle={"h-4 w-4 mr-2"} />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={`bg-white p-6 rounded-xl shadow-lg flex-grow border border-gray-100 ${getCardTransitionClass(2)}`}>
                            <h3 className="mb-6 text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                                Personal Information
                                <UserGroupIcon alt={false} myStyle={"h-5 w-5 ml-2 text-blue-500"} />
                            </h3>
                            <div className="grid grid-cols-3 gap-6">
                                <div className={`flex flex-col ${getContentTransitionClass(1)}`}>
                                    <span className="text-sm text-gray-500 font-medium">First Name</span>
                                    <span className="text-gray-800 font-medium mt-1">{profileData?.firstName || "—"}</span>
                                </div>
                                <div className={`flex flex-col ${getContentTransitionClass(2)}`}>
                                    <span className="text-sm text-gray-500 font-medium">Middle Name</span>
                                    <span className="text-gray-800 font-medium mt-1">{profileData?.middleName || "—"}</span>
                                </div>
                                <div className={`flex flex-col ${getContentTransitionClass(3)}`}>
                                    <span className="text-sm text-gray-500 font-medium">Last Name</span>
                                    <span className="text-gray-800 font-medium mt-1">{profileData?.lastName || "—"}</span>
                                </div>
                                <div className={`flex flex-col ${getContentTransitionClass(4)}`}>
                                    <span className="text-sm text-gray-500 font-medium">Phone No.</span>
                                    <span className="text-gray-800 font-medium mt-1">{profileData?.phone || "—"}</span>
                                </div>
                                <div className={`flex flex-col ${getContentTransitionClass(5)}`}>
                                <span className="text-sm text-gray-500 font-medium">Address</span>
                                    <span className="text-gray-800 font-medium mt-1">{profileData?.address || "—"}</span>
                                </div>
                            </div>
                            <div className={`flex flex-col mt-6 ${getContentTransitionClass(6)}`}>
                                <span className="text-sm text-gray-500 font-medium">Email</span>
                                <span className="text-gray-800 font-medium mt-1 break-words">{profileData?.email || "—"}</span>
                            </div>
                        </div>
                    </div>
                    <div className={`bg-white p-6 rounded-xl shadow-lg border border-gray-100 ${getCardTransitionClass(3)}`}>
                        <h3 className="mb-6 text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                            Professional Details
                            <AcademicCapIcon alt={false} myStyle={"h-5 w-5 ml-2 text-blue-500"} />
                        </h3>
                        <div className="flex items-end justify-between">
                            <div className="grid grid-cols-2 gap-6 w-full">
                                <div className={`flex flex-col ${getContentTransitionClass(7)}`}>
                                    <span className="text-sm text-gray-500 font-medium">Department</span>
                                    <span className="text-gray-800 font-medium mt-1">{profileData?.department || "—"}</span>
                                </div>
                                <div className={`flex flex-col ${getContentTransitionClass(8)}`}>
                                    <span className="text-sm text-gray-500 font-medium">Designation</span>
                                    <span className="text-gray-800 font-medium mt-1">{profileData?.designation || "—"}</span>
                                </div>
                                <div className={`flex flex-col ${getContentTransitionClass(9)}`}>
                                    <span className="text-sm text-gray-500 font-medium">Assigned</span>
                                    <span className="text-gray-800 font-medium mt-1">{profileData?.assigned || "—"}</span>
                                </div>
                                <div className={`flex flex-col ${getContentTransitionClass(10)}`}>
                                    <span className="text-sm text-gray-500 font-medium">Students under you</span>
                                    <span className="text-gray-800 font-medium mt-1">{profileData?.studentCount || "0"}</span>
                                </div>
                            </div>
                            <button
                                onClick={handleShowModal}
                                title="edit"
                                className="flex items-center justify-between py-3 px-5 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white flex-shrink-0 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                            >
                                <PencilIcon alt={true} myStyle={"h-5 w-5 mr-2"} />
                                Update Information
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {role === Roles.STUDENT && (
                <CSSTransition
                    nodeRef={stuProfileModalRef}
                    in={showStuProfileModal}
                    timeout={300}
                    classNames="modal"
                    unmountOnExit
                >
                    <StuModal
                        nodeRef={stuProfileModalRef}
                        setShowOverlay={setShowOverlay}
                        setShowStuProfileModal={setShowStuProfileModal}
                        stuProfileData={stuProfileData}
                        setStuProfileData={setStuProfileData}
                    />
                </CSSTransition>
            )}
            {role === Roles.STUDENT && (
                <div className="w-full max-w-7xl mx-auto">
                    <div className={`text-3xl font-bold text-gray-800 mb-8 ${getContentTransitionClass(0)}`}>
                        Student Profile
                    </div>
                    <div className="grid grid-cols-12 gap-6">
                        {/* Left Column */}
                        <div className="col-span-12 md:col-span-4 space-y-6">
                            {/* Profile Photo Card */}
                            <div className={`bg-white p-6 rounded-xl shadow-lg border border-gray-100 ${getCardTransitionClass(1)}`}>
                                <h3 className="mb-6 text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                                    Profile Photo
                                    <UserCircleIcon alt={false} myStyle={"h-5 w-5 ml-2 text-blue-500"} />
                                </h3>
                                <div className="flex flex-col items-center">
                                    <div className="relative group mb-4">
                                        <div className="absolute inset-0 bg-blue-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                        <img
                                            className="w-40 h-40 rounded-full object-cover border-4 border-blue-100 shadow-md hover:shadow-xl transition-shadow duration-300"
                                            src={
                                                profileData?.avatar?.url === ""
                                                    ? `https://api.dicebear.com/9.x/personas/svg`
                                                    : profileData?.avatar?.url
                                            }
                                            alt="Profile"
                                        />
                                    </div>
                                    <div className="flex gap-x-3">
                                        <button
                                            onClick={() => {
                                                setHiddenProfilePicModal(true);
                                                setShowOverlay(true);
                                            }}
                                            className="p-2 bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-lg text-white flex items-center text-sm shadow-md hover:shadow-lg transform hover:-translate-y-1"
                                        >
                                            <UploadIcon alt={false} myStyle={"h-4 w-4 mr-2"} />
                                            Change
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowOverlay(true);
                                                setHiddenProfilePicDelModal(true);
                                            }}
                                            className="p-2 bg-white border border-red-500 text-red-500 rounded-lg flex items-center text-sm hover:bg-red-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                                        >
                                            <TrashIcon alt={false} myStyle={"h-4 w-4 mr-2"} />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Academic Information Card */}
                            <div className={`bg-white p-6 rounded-xl shadow-lg border border-gray-100 ${getCardTransitionClass(2)}`}>
                                <h3 className="mb-6 text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                                    Academic Information
                                    <AcademicCapIcon alt={false} myStyle={"h-5 w-5 ml-2 text-blue-500"} />
                                </h3>
                                <div className="grid grid-cols-1 gap-y-4">
                                    <div className={`flex flex-col ${getContentTransitionClass(1)}`}>
                                        <span className="text-sm text-gray-500 font-medium">Department</span>
                                        <span className="text-gray-800 font-medium mt-1">{profileData?.department || "—"}</span>
                                    </div>
                                    <div className={`flex flex-col ${getContentTransitionClass(2)}`}>
                                        <span className="text-sm text-gray-500 font-medium">Programme</span>
                                        <span className="text-gray-800 font-medium mt-1">{profileData?.programme || "—"}</span>
                                    </div>
                                    <div className={`flex flex-col ${getContentTransitionClass(3)}`}>
                                        <span className="text-sm text-gray-500 font-medium">Semester</span>
                                        <span className="text-gray-800 font-medium mt-1">{profileData?.semester || "—"}</span>
                                    </div>
                                    <div className={`flex flex-col ${getContentTransitionClass(4)}`}>
                                        <span className="text-sm text-gray-500 font-medium">Mentored By</span>
                                        <span className="text-gray-800 font-medium mt-1">{profileData?.mentoredBy?.name || "—"}</span>
                                    </div>
                                    <div className={`flex flex-col ${getContentTransitionClass(5)}`}>
                                        <span className="text-sm text-gray-500 font-medium">Enrollment Number</span>
                                        <span className="text-gray-800 font-medium mt-1">{profileData?.enrollment_no || "—"}</span>
                                    </div>
                                    <div className={`flex flex-col ${getContentTransitionClass(6)}`}>
                                        <span className="text-sm text-gray-500 font-medium">Enrollment Year</span>
                                        <span className="text-gray-800 font-medium mt-1">{profileData?.enrollment_year || "—"}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Contact Details Card */}
                            <div className={`bg-white p-6 rounded-xl shadow-lg border border-gray-100 ${getCardTransitionClass(3)}`}>
                                <h3 className="mb-6 text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                                    Contact Details
                                    <PhoneIcon alt={false} myStyle={"h-5 w-5 ml-2 text-blue-500"} />
                                </h3>
                                <div className="grid grid-cols-1 gap-y-4">
                                    <div className={`flex flex-col ${getContentTransitionClass(7)}`}>
                                        <span className="text-sm text-gray-500 font-medium">Email ID</span>
                                        <span className="text-gray-800 font-medium mt-1 break-words">{profileData?.email || "—"}</span>
                                    </div>
                                    <div className={`flex flex-col ${getContentTransitionClass(8)}`}>
                                        <span className="text-sm text-gray-500 font-medium">Phone Number</span>
                                        <span className="text-gray-800 font-medium mt-1">{profileData?.phone_no || "—"}</span>
                                    </div>
                                    <div className={`flex flex-col ${getContentTransitionClass(9)}`}>
                                        <span className="text-sm text-gray-500 font-medium">Address</span>
                                        <span className="text-gray-800 font-medium mt-1">{profileData?.address || "—"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Right Column */}
                        <div className="col-span-12 md:col-span-8 space-y-6">
                            {/* Personal Information Card */}
                            <div className={`bg-white p-6 rounded-xl shadow-lg border border-gray-100 ${getCardTransitionClass(4)}`}>
                                <h3 className="mb-6 text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                                    Personal Information
                                    <UserGroupIcon alt={false} myStyle={"h-5 w-5 ml-2 text-blue-500"} />
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className={`flex flex-col ${getContentTransitionClass(10)}`}>
                                        <span className="text-sm text-gray-500 font-medium">First Name</span>
                                        <span className="text-gray-800 font-medium mt-1">{profileData?.firstname || "—"}</span>
                                    </div>
                                    <div className={`flex flex-col ${getContentTransitionClass(11)}`}>
                                        <span className="text-sm text-gray-500 font-medium">Middle Name</span>
                                        <span className="text-gray-800 font-medium mt-1">{profileData?.middlename || "—"}</span>
                                    </div>
                                    <div className={`flex flex-col ${getContentTransitionClass(12)}`}>
                                        <span className="text-sm text-gray-500 font-medium">Last Name</span>
                                        <span className="text-gray-800 font-medium mt-1">{profileData?.lastname || "—"}</span>
                                    </div>
                                    <div className={`flex flex-col ${getContentTransitionClass(13)}`}>
                                        <span className="text-sm text-gray-500 font-medium">Gender</span>
                                        <span className="text-gray-800 font-medium mt-1">{profileData?.gender || "—"}</span>
                                    </div>
                                    <div className={`flex flex-col ${getContentTransitionClass(14)}`}>
                                        <span className="text-sm text-gray-500 font-medium">Blood Group</span>
                                        <span className="text-gray-800 font-medium mt-1">{profileData?.blood_group || "—"}</span>
                                    </div>
                                    <div className={`flex flex-col ${getContentTransitionClass(15)}`}>
                                        <span className="text-sm text-gray-500 font-medium">Home Place</span>
                                        <span className="text-gray-800 font-medium mt-1">{profileData?.home_place || "—"}</span>
                                    </div>
                                </div>
                                <div className={`flex flex-col mt-4 ${getContentTransitionClass(16)}`}>
                                    <span className="text-sm text-gray-500 font-medium">Hobbies</span>
                                    <span className="text-gray-800 font-medium mt-1">{profileData?.hobbies || "—"}</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                                    <div className={`flex flex-col ${getContentTransitionClass(17)}`}>
                                        <span className="text-sm text-gray-500 font-medium">Guardian Name</span>
                                        <span className="text-gray-800 font-medium mt-1">{profileData?.guardian_name || "—"}</span>
                                    </div>
                                    <div className={`flex flex-col ${getContentTransitionClass(18)}`}>
                                    <span className="text-gray-800 font-medium mt-1">{profileData?.guardian_ph_no || "—"}</span>
                                    </div>
                                    <div className={`flex flex-col ${getContentTransitionClass(19)}`}>
                                        <span className="text-sm text-gray-500 font-medium">Guardian Address</span>
                                        <span className="text-gray-800 font-medium mt-1">{profileData?.guardian_address || "—"}</span>
                                    </div>
                                </div>
                                <div className={`flex flex-col mt-4 ${getContentTransitionClass(20)}`}>
                                    <span className="text-sm text-gray-500 font-medium">Family Details</span>
                                    <span className="text-gray-800 font-medium mt-1">{profileData?.family_details || "—"}</span>
                                </div>
                            </div>
                            
                            {/* Hostel Details Card */}
                            <div className={`bg-white p-6 rounded-xl shadow-lg border border-gray-100 ${getCardTransitionClass(5)}`}>
                                <h3 className="mb-6 text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                                    Hostel Details
                                    <OfficeBuildingIcon alt={false} myStyle={"h-5 w-5 ml-2 text-blue-500"} />
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Hostel Boarder */}
                                    <div className="space-y-4">
                                        <h4 className={`font-semibold text-gray-700 ${getContentTransitionClass(21)}`}>
                                            <span className="inline-block bg-blue-100 text-blue-800 text-xs rounded-full px-3 py-1">
                                                Hostel Boarder
                                            </span>
                                        </h4>
                                        <div className={`flex flex-col ${getContentTransitionClass(22)}`}>
                                            <span className="text-sm text-gray-500 font-medium">Hostel Name</span>
                                            <span className="text-gray-800 font-medium mt-1">{profileData?.hostel_name || "—"}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className={`flex flex-col ${getContentTransitionClass(23)}`}>
                                                <span className="text-sm text-gray-500 font-medium">Warden's Name</span>
                                                <span className="text-gray-800 font-medium mt-1">{profileData?.warden_name || "—"}</span>
                                            </div>
                                            <div className={`flex flex-col ${getContentTransitionClass(24)}`}>
                                                <span className="text-sm text-gray-500 font-medium">Ph No.</span>
                                                <span className="text-gray-800 font-medium mt-1">{profileData?.warden_ph_no || "—"}</span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className={`flex flex-col ${getContentTransitionClass(25)}`}>
                                                <span className="text-sm text-gray-500 font-medium">Asst Warden's Name</span>
                                                <span className="text-gray-800 font-medium mt-1">{profileData?.asst_warden_name || "—"}</span>
                                            </div>
                                            <div className={`flex flex-col ${getContentTransitionClass(26)}`}>
                                                <span className="text-sm text-gray-500 font-medium">Ph No.</span>
                                                <span className="text-gray-800 font-medium mt-1">{profileData?.asst_warden_ph_no || "—"}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Not Hostel Boarder */}
                                    <div className="space-y-4">
                                        <h4 className={`font-semibold text-gray-700 ${getContentTransitionClass(27)}`}>
                                            <span className="inline-block bg-indigo-100 text-indigo-800 text-xs rounded-full px-3 py-1">
                                                Day Scholar
                                            </span>
                                        </h4>
                                        <div className={`flex flex-col ${getContentTransitionClass(28)}`}>
                                            <span className="text-sm text-gray-500 font-medium">Responsible Contact Person</span>
                                            <span className="text-gray-800 font-medium mt-1">{profileData?.responsible_contact_person_at_residence || "—"}</span>
                                        </div>
                                        <div className={`flex flex-col ${getContentTransitionClass(29)}`}>
                                            <span className="text-sm text-gray-500 font-medium">Contact Number</span>
                                            <span className="text-gray-800 font-medium mt-1">{profileData?.contact_no_of_contact_person || "—"}</span>
                                        </div>
                                        <div className={`flex flex-col ${getContentTransitionClass(30)}`}>
                                            <span className="text-sm text-gray-500 font-medium">Residence Address</span>
                                            <span className="text-gray-800 font-medium mt-1">{profileData?.residence_address || "—"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Update Information Button */}
                            <div className="flex justify-end">
                                <button
                                    onClick={handleShowModal}
                                    className={`flex items-center py-3 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${getCardTransitionClass(6)}`}
                                >
                                    <PencilIcon alt={true} myStyle={"h-5 w-5 mr-2"} />
                                    Update Information
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;