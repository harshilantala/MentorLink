import React, { useState, useEffect, useRef } from "react";
import PastDetails from "./pastDetails/PastDetails";
import Semester from "./semester/Semester";
import AcademicModal from "./academicModal/AcademicModal";
import { useHistory } from "react-router";
import SemesterModal from "./academicModal/SemesterModal";
import { useDispatch, useSelector } from "react-redux";
import {
    studentGetSemesterDetails,
    studentAddSemesterDetails,
    studentGetPastEduDetails,
} from "../../../../../actions/student";
import SemesterDelModal from "./academicModal/SemesterDelModal";
import Loading from "../../../../loading/Loading";
import { CSSTransition } from "react-transition-group";
import ModalOverlay from "../../../../modal/ModalOverlay";
import Plus from "../../../../../assets/icons/Plus";

const AcademicDetails = () => {
    useEffect(() => {
        dispatch(studentGetSemesterDetails(history));
        dispatch(studentGetPastEduDetails(history));
    }, []);

    // state variables
    const [semNo, setSemNo] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [pastDetails, setPastDetails] = useState({
        10: {
            board: "",
            studied: "",
            marks: "",
        },
        12: {
            board: "",
            studied: "",
            marks: "",
        },
    });
    const [semesterDetails, setSemesterDetails] = useState({
        semester: 0,
        courses: [],
    });
    const [semesterCourses, setSemesterCourses] = useState([]);
    const [activeTab, setActiveTab] = useState('semesters');

    const history = useHistory();
    const dispatch = useDispatch();

    const { semData, pastEducation } = useSelector((state) => state.student);

    // logic to add semester dynamically
    const mount = useRef();

    useEffect(() => {
        // mount is a reference variable that is set true after first time component renders
        if (!mount.current) {
            mount.current = true;
        } else {
            // if the courses length is 1 that means user is trying to add new semester
            if (
                semesterDetails.courses.length === 1 &&
                semesterDetails.courses[0].code === "" &&
                semesterDetails.courses[0].title === "" &&
                semesterDetails.courses[0].credit === "" &&
                semesterDetails.courses[0].type === "" &&
                semesterDetails.courses[0].grade === ""
            ) {
                dispatch(studentAddSemesterDetails(history, semesterDetails, setIsLoading));
            }
        }
    }, [dispatch, history, semesterDetails]);

    const addSemester = (length) => {
        setSemesterDetails({
            semester: (length += 1),
            courses: [
                {
                    code: "",
                    title: "",
                    credit: "",
                    type: "",
                    grade: "",
                },
            ],
        });
        setIsLoading(true);
    };

    const handleShowModal = () => {
        setShowModal(true);
        setShowOverlay(true);
        setPastDetails({
            10: {
                board: pastEducation["10"].board,
                studied: pastEducation["10"].studied,
                marks: pastEducation["10"].marks,
            },
            12: {
                board: pastEducation["12"].board,
                studied: pastEducation["12"].studied,
                marks: pastEducation["12"].marks,
            },
        });
    };

    const handleSemesterModal = (index) => {
        if (semData.length !== 0) {
            let tempC = [];
            semData[index].courses.forEach((course) => {
                let temp = {
                    code: course.code,
                    title: course.title,
                    credit: course.credit,
                    type: course.type,
                    grade: course.grade,
                };

                tempC.push(temp);
            });
            setSemesterCourses([...tempC]);
        }
        setShowSemesterModal(true);
        setShowOverlay(true);
    };

    const handleDelSemModal = () => {
        setShowOverlay(true);
        setShowDelModal(true);
    };

    // ref variables
    const overlayRef = useRef(null);
    const academicModalRef = useRef(null);
    const semesterModalRef = useRef(null);
    const semesterModalDelRef = useRef(null);

    // state variables
    const [showOverlay, setShowOverlay] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showSemesterModal, setShowSemesterModal] = useState(false);
    const [showDelModal, setShowDelModal] = useState(false);
    const [overflow, setOverflow] = useState(true);
    
    // Calculate GPA data for visualization
    const semesterGPAs = semData.map(sem => {
        const totalCredits = sem.courses.reduce((acc, course) => acc + parseFloat(course.credit || 0), 0);
        const totalGradePoints = sem.courses.reduce((acc, course) => {
            const gradeValue = { 'A': 10, 'B': 8, 'C': 6, 'D': 4, 'F': 0 }[course.grade?.charAt(0)] || 0;
            return acc + (parseFloat(course.credit || 0) * gradeValue);
        }, 0);
        return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
    });

    return (
        <div className="w-full h-full relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg">
            <div className="w-full px-6 py-4 bg-white rounded-t-xl shadow-sm">
                <h2 className="text-2xl font-bold text-indigo-800 mb-1">Academic Profile</h2>
                <p className="text-sm text-gray-500">Manage your educational background and semester details</p>
                
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200 mt-4">
                    <button 
                        onClick={() => setActiveTab('past')}
                        className={`py-2 px-4 font-medium text-sm transition-colors duration-200 ease-in-out ${
                            activeTab === 'past' 
                            ? 'text-indigo-600 border-b-2 border-indigo-600' 
                            : 'text-gray-500 hover:text-indigo-500'
                        }`}
                    >
                        Past Education
                    </button>
                    <button 
                        onClick={() => setActiveTab('semesters')}
                        className={`py-2 px-4 font-medium text-sm transition-colors duration-200 ease-in-out ${
                            activeTab === 'semesters' 
                            ? 'text-indigo-600 border-b-2 border-indigo-600' 
                            : 'text-gray-500 hover:text-indigo-500'
                        }`}
                    >
                        Semester Details
                    </button>
                    <button 
                        onClick={() => setActiveTab('performance')}
                        className={`py-2 px-4 font-medium text-sm transition-colors duration-200 ease-in-out ${
                            activeTab === 'performance' 
                            ? 'text-indigo-600 border-b-2 border-indigo-600' 
                            : 'text-gray-500 hover:text-indigo-500'
                        }`}
                    >
                        Performance Overview
                    </button>
                </div>
            </div>

            <div
                className={`w-full h-full pt-4 px-6 ${
                    overflow ? "overflow-y-auto" : "overflow-y-hidden"
                } transition-all duration-300 ease-in-out`}
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
                    nodeRef={academicModalRef}
                    in={showModal}
                    timeout={300}
                    classNames="modal"
                    unmountOnExit
                >
                    <AcademicModal
                        nodeRef={academicModalRef}
                        setShowOverlay={setShowOverlay}
                        setShowModal={setShowModal}
                        setOverflow={setOverflow}
                        pastDetails={pastDetails}
                        setPastDetails={setPastDetails}
                    />
                </CSSTransition>
                <CSSTransition
                    nodeRef={semesterModalRef}
                    in={showSemesterModal}
                    timeout={300}
                    classNames="modal"
                    unmountOnExit
                >
                    <SemesterModal
                        nodeRef={semesterModalRef}
                        setShowOverlay={setShowOverlay}
                        setShowSemesterModal={setShowSemesterModal}
                        setOverflow={setOverflow}
                        semNo={semNo}
                        setSemesterDetails={setSemesterDetails}
                        setSemesterCourses={setSemesterCourses}
                        semesterCourses={semesterCourses}
                        semesterDetails={semesterDetails}
                    />
                </CSSTransition>
                <CSSTransition
                    nodeRef={semesterModalDelRef}
                    in={showDelModal}
                    timeout={300}
                    classNames="modal"
                    unmountOnExit
                >
                    <SemesterDelModal
                        semNo={semNo}
                        nodeRef={semesterModalDelRef}
                        setShowOverlay={setShowOverlay}
                        setShowDelModal={setShowDelModal}
                        setOverflow={setOverflow}
                    />
                </CSSTransition>

                {/* Tab Content */}
                <div className={`transition-opacity duration-300 ${activeTab === 'past' ? 'opacity-100' : 'opacity-0 hidden'}`}>
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md mb-6">
                        <PastDetails
                            handleShowModal={handleShowModal}
                            setOverflow={setOverflow}
                            pastEducation={pastEducation}
                        />
                    </div>
                </div>

                <div className={`space-y-6 transition-opacity duration-300 ${activeTab === 'semesters' ? 'opacity-100' : 'opacity-0 hidden'}`}>
                    {semData.map((sem, index) => (
                        <div 
                            key={sem._id}
                            className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md transform hover:-translate-y-1"
                        >
                            <Semester
                                semester={sem.semester}
                                courses={sem.courses}
                                index={index}
                                handleSemesterModal={handleSemesterModal}
                                handleDelSemModal={handleDelSemModal}
                                setOverflow={setOverflow}
                                setSemNo={setSemNo}
                                semDataLength={semData.length}
                            />
                        </div>
                    ))}

                    {semData.length < 10 && (
                        <button
                            onClick={() => addSemester(semData.length)}
                            type="button"
                            className="rounded-lg text-blue-900 bg-blue-100 hover:bg-blue-200 w-full p-6 disabled:opacity-50 flex justify-center items-center gap-2 mb-6 transition-all duration-200 ease-in-out transform hover:scale-[1.01] shadow-sm"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loading myStyle={"w-6 h-6"} />
                            ) : (
                                <Plus alt={true} myStyle={"w-6 h-6"} />
                            )}
                            <span className="font-medium">Add Semester</span>
                        </button>
                    )}
                </div>

                <div className={`transition-opacity duration-300 ${activeTab === 'performance' ? 'opacity-100' : 'opacity-0 hidden'}`}>
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">GPA Progression</h3>
                        <div className="h-64 w-full">
                            <div className="flex items-end h-48 w-full space-x-2">
                                {semesterGPAs.map((gpa, index) => (
                                    <div key={index} className="relative flex flex-col items-center flex-1">
                                        <div 
                                            className="bg-indigo-600 w-full rounded-t-md transition-all duration-500 ease-out"
                                            style={{ height: `${Math.min(parseFloat(gpa) * 10, 100)}%` }}
                                        ></div>
                                        <span className="absolute bottom-full mb-1 text-xs font-medium text-indigo-800">
                                            {gpa}
                                        </span>
                                        <span className="mt-2 text-xs text-gray-600">Sem {index + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Course Distribution</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {['Core', 'Elective', 'Lab', 'Project'].map(type => {
                                const count = semData.reduce((acc, sem) => {
                                    return acc + sem.courses.filter(course => 
                                        course.type?.toLowerCase() === type.toLowerCase()
                                    ).length;
                                }, 0);
                                
                                return (
                                    <div key={type} className="bg-gray-50 p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-indigo-700">{count}</div>
                                        <div className="text-sm text-gray-500">{type} Courses</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcademicDetails;