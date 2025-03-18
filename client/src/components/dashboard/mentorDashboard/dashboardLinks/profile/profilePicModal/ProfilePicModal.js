import React, { useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { mentorUpdateProfilePicture } from "../../../../../../actions/mentor";
import { studentUpdateProfilePicture } from "../../../../../../actions/student";
import UploadIcon from "../../../../../../assets/icons/UploadIcon";
import Resizer from "react-image-file-resizer";
import { authContext } from "../../../../../../contexts/authContext";
import { Roles } from "../../../../../../utility";

const ProfilePicModal = ({ setHiddenProfilePicModal, setShowOverlay, nodeRef }) => {
    // Getting role of the logged in user
    const { role } = useContext(authContext);

    // States for UI/UX enhancements
    const [image, setImage] = useState(null);
    const [imageToBeSent, setImageToBeSent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [fileError, setFileError] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();

    // Function to resize image
    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                200,
                200,
                "JPEG",
                90,
                0,
                (uri) => resolve(uri),
                "file"
            );
        });

    // Function to handle the image submit
    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (!imageToBeSent) {
            setFileError("Please select an image first");
            return;
        }
        
        setIsLoading(true);
        const formData = new FormData();
        formData.append("avatar", imageToBeSent);
        
        setTimeout(() => {
            if (role === Roles.MENTOR) {
                dispatch(mentorUpdateProfilePicture(history, formData));
            } else {
                dispatch(studentUpdateProfilePicture(history, formData));
            }
            handleCloseModalWithAnimation();
        }, 800);
    };

    // Function to process file - works for both drop and select
    const processFile = async (file) => {
        // Reset error state
        setFileError("");
        
        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            setFileError("Please select a valid image file (PNG or JPEG)");
            return;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setFileError("File is too large (max 5MB)");
            return;
        }
        
        try {
            setImage(URL.createObjectURL(file));
            const resizedImage = await resizeFile(file);
            setImageToBeSent(resizedImage);
        } catch (err) {
            console.error("Error processing image:", err);
            setFileError("Failed to process image. Please try another file.");
        }
    };

    // Function to handle selected file
    const onImageChange = async (event) => {
        if (event.target.files && event.target.files[0]) {
            await processFile(event.target.files[0]);
        }
    };

    // Drag and drop handlers
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            await processFile(e.dataTransfer.files[0]);
        }
    };

    // Function to close modal with animation
    const handleCloseModalWithAnimation = () => {
        setFadeOut(true);
        setTimeout(() => {
            setHiddenProfilePicModal(false);
            setShowOverlay(false);
        }, 300);
    };

    // Cleanup object URLs on unmount
    useEffect(() => {
        return () => {
            if (image) URL.revokeObjectURL(image);
        };
    }, [image]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 z-50">
            <div
                ref={nodeRef}
                className={`w-full max-w-md transform ${fadeOut ? 'scale-95 opacity-0' : 'scale-100 opacity-100'} transition-all duration-300 ease-in-out`}
            >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-between">
                        <h4 className="text-xl font-bold text-white">Update Profile Photo</h4>
                        <button 
                            onClick={handleCloseModalWithAnimation}
                            className="text-white hover:text-gray-200 transition-colors duration-200 focus:outline-none"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    
                    {/* Content */}
                    <div className="px-6 py-6">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-40 h-40 rounded-full border-4 border-blue-100 dark:border-gray-700 mb-4 flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-inner transition-all duration-300">
                                {image ? (
                                    <img 
                                        src={image} 
                                        alt="Selected profile" 
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                    />
                                ) : (
                                    <svg className="w-20 h-20 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                )}
                            </div>
                            
                            <form 
                                encType="multipart/form-data" 
                                onSubmit={handleSubmit} 
                                className="w-full"
                                onDragEnter={handleDrag}
                            >
                                <div 
                                    className={`mb-4 p-4 border-2 border-dashed rounded-lg ${dragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'} 
                                    transition-all duration-200 relative`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                >
                                    <input 
                                        onChange={onImageChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        aria-describedby="user_avatar_help"
                                        id="user_avatar"
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpg"
                                    />
                                    <div className="text-center">
                                        <UploadIcon alt={false} myStyle={"h-10 w-10 mx-auto mb-2 text-blue-500 dark:text-blue-400"} />
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            <span className="font-medium text-blue-600 dark:text-blue-400">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            PNG or JPEG (MAX. 5MB)
                                        </p>
                                    </div>
                                </div>
                                
                                {fileError && (
                                    <p className="text-sm text-red-500 mt-1 mb-2 transition-all duration-300 animate-pulse">
                                        {fileError}
                                    </p>
                                )}
                                
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={handleCloseModalWithAnimation}
                                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 
                                                 text-gray-800 dark:text-gray-200 rounded-md transition-colors duration-200 
                                                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading || !imageToBeSent}
                                        className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md 
                                                  transition-all duration-200 focus:outline-none focus:ring-2 
                                                  focus:ring-offset-2 focus:ring-blue-500 flex items-center space-x-2
                                                  ${(isLoading || !imageToBeSent) ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Uploading...</span>
                                            </>
                                        ) : (
                                            <>
                                                <UploadIcon alt={false} myStyle={"h-4 w-4"} />
                                                <span>Upload</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePicModal;