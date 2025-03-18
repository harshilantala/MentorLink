import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { mentorUpdateProfile } from "../../../../../actions/mentor";

const ProfileModal = ({
    nodeRef,
    mentorProfileData,
    setShowOverlay,
    setShowEditModal,
    setMentorProfileData,
}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [disable, setDisable] = useState(true);
    const [activeTab, setActiveTab] = useState("professional");
    const [isVisible, setIsVisible] = useState(false);

    // Control entrance animation
    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleModalActions = () => {
        setIsVisible(false);
        setTimeout(() => {
            setShowOverlay(false);
            setShowEditModal(false);
        }, 300); // Match transition duration
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(mentorUpdateProfile(history, mentorProfileData));
        handleModalActions();
    };

    const handleChange = (e) => {
        setDisable(false);
        setMentorProfileData({
            ...mentorProfileData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-40 transition-opacity duration-300" style={{ opacity: isVisible ? "1" : "0" }}>
            <div
                ref={nodeRef}
                className="w-4/5 max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300"
                style={{ 
                    transform: isVisible ? "scale(1) translateY(0)" : "scale(0.9) translateY(20px)",
                }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold">Edit Profile</h3>
                        <button 
                            onClick={handleModalActions} 
                            className="bg-white bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center transition-all hover:bg-opacity-30 hover:rotate-90 duration-300"
                        >
                            <span className="text-white text-xl">&times;</span>
                        </button>
                    </div>
                    <p className="mt-2 text-blue-100">Update your personal and professional information</p>
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200">
                    <button
                        className={`py-4 px-6 text-lg font-medium transition-all duration-200 ${
                            activeTab === "professional" 
                            ? "text-blue-600 border-b-2 border-blue-600" 
                            : "text-gray-500 hover:text-blue-600"
                        }`}
                        onClick={() => setActiveTab("professional")}
                    >
                        Professional
                    </button>
                    <button
                        className={`py-4 px-6 text-lg font-medium transition-all duration-200 ${
                            activeTab === "personal" 
                            ? "text-blue-600 border-b-2 border-blue-600" 
                            : "text-gray-500 hover:text-blue-600"
                        }`}
                        onClick={() => setActiveTab("personal")}
                    >
                        Personal
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 max-h-96 overflow-y-auto">
                    <form onSubmit={handleSubmit}>
                        {/* Professional Information */}
                        <div 
                            className={`transition-all duration-300 ${
                                activeTab === "professional" ? "opacity-100 block" : "opacity-0 hidden"
                            }`}
                        >
                            <div className="bg-blue-50 p-4 rounded-lg mb-6">
                                <h4 className="text-lg font-bold text-blue-800 mb-1">Professional Information</h4>
                                <p className="text-sm text-blue-700">Your academic and professional details</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="department" className="block text-gray-700 font-medium">
                                        Department
                                    </label>
                                    <select
                                        id="department"
                                        name="department"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        value={mentorProfileData.department}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select department</option>
                                        <option value="Computer Science & Engineering">
                                            Computer Science & Engineering
                                        </option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="designation" className="block text-gray-700 font-medium">
                                        Designation
                                    </label>
                                    <input
                                        id="designation"
                                        type="text"
                                        name="designation"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        value={mentorProfileData.designation}
                                        onChange={handleChange}
                                        placeholder="e.g. Associate Professor"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div 
                            className={`transition-all duration-300 ${
                                activeTab === "personal" ? "opacity-100 block" : "opacity-0 hidden"
                            }`}
                        >
                            <div className="bg-indigo-50 p-4 rounded-lg mb-6">
                                <h4 className="text-lg font-bold text-indigo-800 mb-1">Personal Information</h4>
                                <p className="text-sm text-indigo-700">Your personal contact information</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="firstname" className="block text-gray-700 font-medium">
                                        First name
                                    </label>
                                    <input
                                        id="firstname"
                                        type="text"
                                        name="firstname"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                        value={mentorProfileData.firstname}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="middlename" className="block text-gray-700 font-medium">
                                        Middle name
                                    </label>
                                    <input
                                        id="middlename"
                                        type="text"
                                        name="middlename"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                        value={mentorProfileData.middlename}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastname" className="block text-gray-700 font-medium">
                                        Last name
                                    </label>
                                    <input
                                        id="lastname"
                                        type="text"
                                        name="lastname"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                        value={mentorProfileData.lastname}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="block text-gray-700 font-medium">
                                        Phone No.
                                    </label>
                                    <input
                                        id="phone"
                                        type="text"
                                        name="phone"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                        value={mentorProfileData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label htmlFor="address" className="block text-gray-700 font-medium">
                                        Address
                                    </label>
                                    <input
                                        id="address"
                                        type="text"
                                        name="address"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                        value={mentorProfileData.address}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer with action buttons */}
                        <div className="mt-8 pt-5 border-t border-gray-200 flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={handleModalActions}
                                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={disable}
                                type="submit"
                                className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transform hover:-translate-y-1 active:translate-y-0"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;