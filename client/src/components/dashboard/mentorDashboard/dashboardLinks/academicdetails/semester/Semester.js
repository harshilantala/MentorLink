import React from "react";
import TrashIcon from "../../../../../../assets/icons/TrashIcon";

const Semester = ({
    semester,
    courses,
    handleSemesterModal,
    setOverflow,
    setSemNo,
    index,
    handleDelSemModal,
    semDataLength,
}) => {
    const handleActions = () => {
        setOverflow(false);
        setSemNo(semester);
    };

    const handleEditModal = () => {
        handleSemesterModal(index);
        handleActions();
    };

    const handleDeleteModal = () => {
        handleDelSemModal();
        handleActions();
    };

    // Calculate semester stats
    const totalCredits = courses.reduce((sum, course) => sum + parseFloat(course.credit || 0), 0);
    const gradeMap = { 'A': 10, 'A-': 9, 'B+': 8, 'B': 7, 'B-': 6, 'C+': 5, 'C': 4, 'D': 2, 'F': 0 };
    
    const gpa = courses.length > 0 ? 
        courses.reduce((sum, course) => {
            const gradeValue = gradeMap[course.grade] || 
                               (course.grade ? gradeMap[course.grade.charAt(0)] || 0 : 0);
            return sum + (parseFloat(course.credit || 0) * gradeValue);
        }, 0) / totalCredits : 0;

    // Get color based on grade
    const getGradeColor = (grade) => {
        if (!grade) return "text-gray-500";
        const firstChar = grade.charAt(0);
        if (firstChar === 'A') return "text-green-600 font-medium";
        if (firstChar === 'B') return "text-blue-600 font-medium";
        if (firstChar === 'C') return "text-yellow-600 font-medium";
        if (firstChar === 'D') return "text-orange-600 font-medium";
        if (firstChar === 'F') return "text-red-600 font-medium";
        return "text-gray-600";
    };

    // Get background color for course type
    const getTypeBackground = (type) => {
        if (!type) return "bg-gray-100";
        const lowerType = type.toLowerCase();
        if (lowerType.includes('core')) return "bg-blue-50 text-blue-700";
        if (lowerType.includes('elective')) return "bg-purple-50 text-purple-700";
        if (lowerType.includes('lab')) return "bg-green-50 text-green-700";
        if (lowerType.includes('project')) return "bg-amber-50 text-amber-700";
        return "bg-gray-50 text-gray-700";
    };

    return (
        <div className="w-full">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-t-lg p-4 flex justify-between items-center border-b border-indigo-100">
                <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg text-indigo-800">
                            Semester {semester}
                        </h3>
                        <div className="text-xs text-indigo-600 mt-1">
                            <span className="inline-flex items-center px-2 py-1 bg-white rounded-full">
                                <span className="font-medium mr-1">{totalCredits}</span> Credits
                            </span>
                            <span className="inline-flex items-center px-2 py-1 bg-white rounded-full ml-2">
                                <span className="font-medium mr-1">{gpa.toFixed(2)}</span> GPA
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={handleEditModal}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-4 py-2 rounded-md transition-all duration-200 flex items-center text-sm"
                        type="button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Edit
                    </button>
                    {semester === semDataLength && (
                        <button
                            onClick={handleDeleteModal}
                            className="bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-2 rounded-md transition-all duration-200"
                            type="button"
                        >
                            <TrashIcon alt={true} myStyle={"w-4 h-4"} />
                        </button>
                    )}
                </div>
            </div>

            <div className="overflow-hidden rounded-b-lg border border-t-0 border-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr className="bg-gray-50">
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Code
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Credit
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Grade
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {courses.map((course, idx) => (
                                <tr 
                                    key={idx} 
                                    className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {course.code}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {course.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {course.credit}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 py-1 text-xs rounded-full ${getTypeBackground(course.type)}`}>
                                            {course.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`${getGradeColor(course.grade)}`}>
                                            {course.grade}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {courses.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">
                                        No courses added for this semester yet
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Semester;