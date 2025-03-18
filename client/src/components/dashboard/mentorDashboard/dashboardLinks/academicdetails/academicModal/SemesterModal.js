import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { studentUpdateSemesterDetails } from "../../../../../../actions/student";

// Assuming you have these icons imported already
import MinusSmIcon from "../../../../../../assets/icons/MinusSmIcon";
import Plus from "../../../../../../assets/icons/Plus";

const SemesterModal = ({
    nodeRef,
    setShowOverlay,
    setShowSemesterModal,
    setOverflow,
    semNo,
    setSemesterDetails,
    semesterCourses,
    semesterDetails,
    setSemesterCourses,
}) => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState(0); // For pagination tabs
    const coursesPerPage = 3;
    const dispatch = useDispatch();
    const history = useHistory();

    // Calculate total pages for pagination
    const totalPages = Math.ceil(semesterCourses.length / coursesPerPage);

    useEffect(() => {
        // Set the active tab to the last tab when adding a new course
        if (semesterCourses.length > 0 && semesterCourses.length % coursesPerPage === 1) {
            setActiveTab(Math.floor((semesterCourses.length - 1) / coursesPerPage));
        }
    }, [semesterCourses.length]);

    const handleChange = (e, i) => {
        setIsDisabled(false);
        let formValues = [...semesterCourses];
        formValues[i][e.target.name] = e.target.value;
        setSemesterCourses([...formValues]);
        
        if (
            semesterCourses.length === 1 &&
            semesterCourses[0].code === "" &&
            semesterCourses[0].title === "" &&
            semesterCourses[0].credit === "" &&
            semesterCourses[0].type === "" &&
            semesterCourses[0].grade === ""
        )
            return;
            
        setSemesterDetails({
            semester: semNo,
            courses: formValues,
        });
    };

    const addField = () => {
        setSemesterCourses([
            ...semesterCourses,
            { code: "", title: "", credit: "", type: "", grade: "" },
        ]);
    };

    const removeField = (i) => {
        let formValues = [...semesterCourses];
        formValues.splice(i, 1);
        setSemesterCourses([...formValues]);
        
        if (
            formValues.length === 1 &&
            formValues[0].code === "" &&
            formValues[0].title === "" &&
            formValues[0].credit === "" &&
            formValues[0].type === "" &&
            formValues[0].grade === ""
        )
            return;
            
        setSemesterDetails({
            semester: semNo,
            courses: formValues,
        });
        
        // Update active tab if current tab becomes empty
        if (i === semesterCourses.length - 1 && i % coursesPerPage === 0 && activeTab > 0) {
            setActiveTab(activeTab - 1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        dispatch(studentUpdateSemesterDetails(history, semesterDetails));
        
        // Simulate loading state
        setTimeout(() => {
            setIsSubmitting(false);
            handleModalActions();
        }, 600);
    };

    const handleModalActions = () => {
        // Add fade-out effect
        document.getElementById('semester-modal-container').classList.add('opacity-0');
        setTimeout(() => {
            setShowOverlay(false);
            setShowSemesterModal(false);
            setOverflow(true);
        }, 300);
    };

    // Get current page courses
    const getCurrentCourses = () => {
        const startIndex = activeTab * coursesPerPage;
        const endIndex = startIndex + coursesPerPage;
        return semesterCourses.slice(startIndex, endIndex);
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 z-40">
                <div 
                    id="semester-modal-container"
                    ref={nodeRef}
                    className="w-11/12 lg:w-3/4 xl:w-2/3 transform transition-all duration-300 ease-in-out opacity-100 scale-100"
                >
                    <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white">Semester {semNo} Courses</h3>
                            <button 
                                onClick={handleModalActions} 
                                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full h-8 w-8 flex items-center justify-center transition-all duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        
                        {/* Summary info */}
                        <div className="bg-blue-50 px-6 py-3 border-b border-blue-100">
                            <div className="flex flex-wrap items-center text-sm">
                                <div className="mr-6 mb-2 md:mb-0">
                                    <span className="font-medium text-gray-700">Total Courses:</span> 
                                    <span className="ml-1 text-blue-700">{semesterCourses.length}</span>
                                </div>
                                <div className="mr-6 mb-2 md:mb-0">
                                    <span className="font-medium text-gray-700">Total Credits:</span> 
                                    <span className="ml-1 text-blue-700">
                                        {semesterCourses.reduce((sum, course) => sum + (parseFloat(course.credit) || 0), 0)}
                                    </span>
                                </div>
                                <div className="mb-2 md:mb-0">
                                    <span className="font-medium text-gray-700">Page:</span> 
                                    <span className="ml-1 text-blue-700">{activeTab + 1} of {Math.max(1, totalPages)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="p-6">
                            <form onSubmit={handleSubmit}>
                                {/* Course list */}
                                <div className="space-y-6">
                                    {getCurrentCourses().map((course, index) => {
                                        const actualIndex = index + activeTab * coursesPerPage;
                                        return (
                                            <div key={actualIndex} className="bg-white border border-gray-200 rounded-lg p-4 transition-all duration-200 hover:shadow-md">
                                                <div className="flex justify-between items-center mb-3">
                                                    <h5 className="text-gray-800 font-medium">Course {actualIndex + 1}</h5>
                                                    {semesterCourses.length > 1 && (
                                                        <button
                                                            onClick={() => removeField(actualIndex)}
                                                            type="button"
                                                            className="p-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-all duration-200 flex items-center justify-center"
                                                            title="Remove course"
                                                        >
                                                            <MinusSmIcon alt={true} myStyle={"w-5 h-5"} />
                                                        </button>
                                                    )}
                                                </div>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                                    <div className="transition-all duration-200 transform hover:-translate-y-1">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
                                                        <input
                                                            type="text"
                                                            name="code"
                                                            required
                                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                            value={course.code}
                                                            onChange={(e) => handleChange(e, actualIndex)}
                                                            placeholder="e.g., CS101"
                                                        />
                                                    </div>
                                                    
                                                    <div className="transition-all duration-200 transform hover:-translate-y-1 lg:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                                                        <input
                                                            type="text"
                                                            name="title"
                                                            required
                                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                            value={course.title}
                                                            onChange={(e) => handleChange(e, actualIndex)}
                                                            placeholder="e.g., Introduction to Programming"
                                                        />
                                                    </div>
                                                    
                                                    <div className="transition-all duration-200 transform hover:-translate-y-1">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Credits</label>
                                                        <input
                                                            type="number"
                                                            name="credit"
                                                            required
                                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                            value={course.credit}
                                                            onChange={(e) => handleChange(e, actualIndex)}
                                                            placeholder="e.g., 4"
                                                        />
                                                    </div>
                                                    
                                                    <div className="transition-all duration-200 transform hover:-translate-y-1">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                                        <select
                                                            name="type"
                                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                            value={course.type}
                                                            onChange={(e) => handleChange(e, actualIndex)}
                                                            required
                                                        >
                                                            <option value="">Select type</option>
                                                            <option value="C">Core (C)</option>
                                                            <option value="E">Elective (E)</option>
                                                            <option value="OE">Open Elective (OE)</option>
                                                            <option value="Audit">Audit</option>
                                                            <option value="Minor Project">Minor Project</option>
                                                            <option value="Major Project">Major Project</option>
                                                        </select>
                                                    </div>
                                                    
                                                    <div className="transition-all duration-200 transform hover:-translate-y-1">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                                                        <select
                                                            name="grade"
                                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                            value={course.grade}
                                                            onChange={(e) => handleChange(e, actualIndex)}
                                                            required
                                                        >
                                                            <option value="">Select grade</option>
                                                            <option value="O">O (Outstanding)</option>
                                                            <option value="A+">A+ (Excellent)</option>
                                                            <option value="A">A (Very Good)</option>
                                                            <option value="B+">B+ (Good)</option>
                                                            <option value="B">B (Above Average)</option>
                                                            <option value="C">C (Average)</option>
                                                            <option value="D">D (Pass)</option>
                                                            <option value="P">P (Pass)</option>
                                                            <option value="S">S (Satisfactory)</option>
                                                            <option value="F">F (Fail)</option>
                                                            <option value="X">X (Absent)</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                
                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center mt-6 space-x-2">
                                        {Array.from({ length: totalPages }).map((_, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => setActiveTab(index)}
                                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                                                    activeTab === index
                                                        ? "bg-blue-600 text-white"
                                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                
                                {/* Actions */}
                                <div className="mt-8 flex items-center justify-between">
                                    <div>
                                        {semesterCourses.length < 12 && (
                                            <button
                                                onClick={addField}
                                                type="button"
                                                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all duration-200 flex items-center justify-center group"
                                            >
                                                <span className="mr-2">
                                                    <Plus alt={true} myStyle={"w-5 h-5"} />
                                                </span>
                                                <span className="font-medium">Add Course</span>
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            type="button"
                                            onClick={handleModalActions}
                                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-all duration-200"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isDisabled || isSubmitting}
                                            className={`px-4 py-2 rounded-lg text-white transition-all duration-200 flex items-center ${isDisabled ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Updating...
                                                </>
                                            ) : (
                                                'Update Semester'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SemesterModal;