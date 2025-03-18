import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { studentUpdatePastEduDetails } from "../../../../../../actions/student";

const AcademicModal = ({
    setShowModal,
    setOverflow,
    pastDetails,
    setPastDetails,
    setShowOverlay,
    nodeRef,
}) => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [activeTab, setActiveTab] = useState("10");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange10 = (e) => {
        setIsDisabled(false);
        setPastDetails({
            ...pastDetails,
            10: {
                ...pastDetails[10],
                [e.target.name]: e.target.value,
            },
        });
    };

    const handleChange12 = (e) => {
        setIsDisabled(false);
        setPastDetails({
            ...pastDetails,
            12: {
                ...pastDetails[12],
                [e.target.name]: e.target.value,
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        dispatch(studentUpdatePastEduDetails(history, pastDetails));
        
        // Simulate loading state
        setTimeout(() => {
            setIsSubmitting(false);
            handleModalActions();
        }, 600);
    };

    const handleModalActions = () => {
        // Add fade-out effect
        document.getElementById('modal-container').classList.add('opacity-0');
        setTimeout(() => {
            setShowOverlay(false);
            setShowModal(false);
            setOverflow(true);
        }, 300);
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 z-40">
                <div 
                    id="modal-container"
                    ref={nodeRef}
                    className="w-full max-w-3xl transform transition-all duration-300 ease-in-out opacity-100 scale-100"
                >
                    <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white">Academic History</h3>
                            <button 
                                onClick={handleModalActions} 
                                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full h-8 w-8 flex items-center justify-center transition-all duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b">
                            <button 
                                className={`px-6 py-3 font-medium transition-all duration-200 ${activeTab === "10" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-blue-600"}`}
                                onClick={() => setActiveTab("10")}
                            >
                                Class 10 Details
                            </button>
                            <button 
                                className={`px-6 py-3 font-medium transition-all duration-200 ${activeTab === "12" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-blue-600"}`}
                                onClick={() => setActiveTab("12")}
                            >
                                Class 12 Details
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <form onSubmit={handleSubmit}>
                                {/* Class 10 Form */}
                                <div className={`${activeTab === "10" ? "block" : "hidden"} transition-all duration-300`}>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="transition-all duration-200 transform hover:-translate-y-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Board</label>
                                            <input
                                                type="text"
                                                name="board"
                                                required
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                value={pastDetails[10].board}
                                                onChange={handleChange10}
                                                placeholder="e.g., CBSE, ICSE"
                                            />
                                        </div>
                                        <div className="transition-all duration-200 transform hover:-translate-y-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">School / University</label>
                                            <input
                                                type="text"
                                                name="studied"
                                                required
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                value={pastDetails[10].studied}
                                                onChange={handleChange10}
                                                placeholder="School name"
                                            />
                                        </div>
                                        <div className="transition-all duration-200 transform hover:-translate-y-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Marks</label>
                                            <input
                                                type="text"
                                                name="marks"
                                                required
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                value={pastDetails[10].marks}
                                                onChange={handleChange10}
                                                placeholder="e.g., 95% or 9.8 CGPA"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Class 12 Form */}
                                <div className={`${activeTab === "12" ? "block" : "hidden"} transition-all duration-300`}>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="transition-all duration-200 transform hover:-translate-y-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Board</label>
                                            <input
                                                type="text"
                                                name="board"
                                                required
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                value={pastDetails[12].board}
                                                onChange={handleChange12}
                                                placeholder="e.g., CBSE, ICSE"
                                            />
                                        </div>
                                        <div className="transition-all duration-200 transform hover:-translate-y-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">School / University</label>
                                            <input
                                                type="text"
                                                name="studied"
                                                required
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                value={pastDetails[12].studied}
                                                onChange={handleChange12}
                                                placeholder="School name"
                                            />
                                        </div>
                                        <div className="transition-all duration-200 transform hover:-translate-y-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Marks</label>
                                            <input
                                                type="text"
                                                name="marks"
                                                required
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                value={pastDetails[12].marks}
                                                onChange={handleChange12}
                                                placeholder="e.g., 95% or 9.8 CGPA"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="mt-8 flex items-center justify-end space-x-3">
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
                                            'Update Details'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AcademicModal;