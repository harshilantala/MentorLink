import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { mentorDeleteProfilePicture } from "../../../../../../actions/mentor";
import { studentDeleteProfilePicture } from "../../../../../../actions/student";
import { authContext } from "../../../../../../contexts/authContext";
import { Roles } from "../../../../../../utility";

const ProfilePicDelModal = ({ nodeRef, setHiddenProfilePicDelModal, setShowOverlay }) => {
    // Getting role of the logged in user
    const { role } = useContext(authContext);
    const [isLoading, setIsLoading] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    // Function to delete the profile picture
    const handleDelete = () => {
        setIsLoading(true);
        
        setTimeout(() => {
            if (role === Roles.MENTOR) {
                dispatch(mentorDeleteProfilePicture(history));
            } else {
                dispatch(studentDeleteProfilePicture(history));
            }
            handleHideModalWithAnimation();
        }, 800);
    };

    // Function to hide modal with animation
    const handleHideModalWithAnimation = () => {
        setFadeOut(true);
        setTimeout(() => {
            setShowOverlay(false);
            setHiddenProfilePicDelModal(false);
        }, 300);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 z-50">
            <div
                ref={nodeRef}
                className={`w-full max-w-md transform ${fadeOut ? 'scale-95 opacity-0' : 'scale-100 opacity-100'} transition-all duration-300 ease-in-out`}
            >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-between">
                        <h4 className="text-xl font-bold text-white">Delete Profile Picture</h4>
                        <button 
                            onClick={handleHideModalWithAnimation}
                            className="text-white hover:text-gray-200 transition-colors duration-200 focus:outline-none"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    
                    {/* Content */}
                    <div className="px-6 py-8">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mb-4 flex items-center justify-center overflow-hidden relative">
                                <svg className="w-16 h-16 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                <div className="absolute inset-0 bg-red-500 bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </div>
                            </div>
                            <p className="text-base text-center text-gray-700 dark:text-gray-300">
                                Are you sure you want to delete your profile picture? This will reset it to the default avatar.
                            </p>
                        </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 flex justify-end space-x-3">
                        <button
                            onClick={handleHideModalWithAnimation}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 
                                      text-gray-800 dark:text-gray-200 rounded-md transition-colors duration-200 
                                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isLoading}
                            className={`px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md 
                                      transition-all duration-200 focus:outline-none focus:ring-2 
                                      focus:ring-offset-2 focus:ring-red-500 flex items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Deleting...
                                </>
                            ) : (
                                'Delete'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePicDelModal;