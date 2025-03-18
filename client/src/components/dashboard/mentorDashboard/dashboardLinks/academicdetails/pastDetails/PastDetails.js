import React from "react";

const PastDetails = ({ handleShowModal, setOverflow, pastEducation }) => {
    const handleActions = () => {
        handleShowModal();
        setOverflow(false);
    };

    // Function to render medal icon based on marks
    const renderPerformanceBadge = (marks) => {
        if (!marks) return null;
        const numericMarks = parseFloat(marks);
        
        if (numericMarks >= 90) {
            return (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <svg className="mr-1 h-3 w-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Excellent
                </span>
            );
        } else if (numericMarks >= 75) {
            return (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <svg className="mr-1 h-3 w-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Very Good
                </span>
            );
        }
        return null;
    };

    return (
        <div className="w-full">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg p-4 flex justify-between items-center border-b border-indigo-100">
                <div className="flex items-center">
                    <div className="mr-3 bg-indigo-100 p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-indigo-800">
                            Past Education Details
                        </h3>
                        <p className="text-xs text-indigo-600 mt-1">
                            School and pre-college academic records
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleActions}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-4 py-2 rounded-md transition-all duration-200 flex items-center text-sm"
                    type="button"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit
                </button>
            </div>

            <div className="overflow-hidden rounded-b-lg border border-t-0 border-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr className="bg-gray-50">
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Class
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Board / University
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    School / Institution
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Marks / Percentage
                                </th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-blue-600 font-medium text-sm">10</span>
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-gray-900">Class 10</div>
                                            <div className="text-xs text-gray-500">Secondary Education</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{pastEducation["10"]?.board || "—"}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{pastEducation["10"]?.studied || "—"}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className={`text-sm font-medium ${parseFloat(pastEducation["10"]?.marks) >= 80 ? "text-green-600" : "text-gray-900"}`}>
                                            {pastEducation["10"]?.marks || "—"}
                                        </span>
                                        {renderPerformanceBadge(pastEducation["10"]?.marks)}
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                                            <span className="text-purple-600 font-medium text-sm">12</span>
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-gray-900">Class 12</div>
                                            <div className="text-xs text-gray-500">Higher Secondary</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{pastEducation["12"]?.board || "—"}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{pastEducation["12"]?.studied || "—"}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className={`text-sm font-medium ${parseFloat(pastEducation["12"]?.marks) >= 80 ? "text-green-600" : "text-gray-900"}`}>
                                            {pastEducation["12"]?.marks || "—"}
                                        </span>
                                        {renderPerformanceBadge(pastEducation["12"]?.marks)}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PastDetails;