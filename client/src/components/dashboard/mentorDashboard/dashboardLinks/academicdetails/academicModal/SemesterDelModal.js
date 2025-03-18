import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { studentDeleteSemesterDetails } from "../../../../../../actions/student";

const SemesterDelModal = ({ semNo, setOverflow, nodeRef, setShowOverlay, setShowDelModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        setIsDeleting(true);
        dispatch(studentDeleteSemesterDetails(history, { sem: semNo }));
        
        // Add a small delay for the animation to complete
        setTimeout(() => {
            handleModalActions();
        }, 500);
    };

    const handleModalActions = () => {
        // Add fade-out effect
        document.getElementById('del-modal-container').classList.add('opacity-0');
        setTimeout(() => {
            setOverflow(true);
            setShowOverlay(false);
            setShowDelModal(false);
        }, 300);
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 z-40">
                <div 
                    id="del-modal-container"
                    ref={nodeRef}
                    className="w-full max-w-md transform transition-all duration-300 ease-in-out opacity-100 scale-100"
                >
                    <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white">Delete Semester {semNo}</h3>
                            <button 
                                onClick={handleModalActions} 
                                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full h-8 w-8 flex items-center justify-center transition-all duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <div className="bg-red-100 p-3 rounded-full mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-gray-800">Confirm Deletion</h4>
                                    <p className="text-gray-600">This action cannot be undone.</p>
                                </div>
                            </div>
                            
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-md">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-yellow-700">
                                            Are you sure you want to delete the semester {semNo} details?
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-6 flex items-center justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={handleModalActions}
                                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-all duration-200 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center"
                                >
                                    {isDeleting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Delete Semester
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SemesterDelModal;