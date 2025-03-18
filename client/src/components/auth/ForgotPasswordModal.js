import React from "react";
import { useDispatch } from "react-redux";
import { sendForgotPassword } from "../../actions";

const ForgotPasswordModal = ({ nodeRef, setShowModal, setFPEmail, FPEmail }) => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFPEmail({ ...FPEmail, [e.target.name]: e.target.value });
    };

    const handleForgotPassword = () => {
        dispatch(sendForgotPassword(FPEmail, setShowModal));
        setFPEmail({ ...FPEmail, email: "" });
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div 
                ref={nodeRef}
                className="bg-white w-full max-w-md mx-4 rounded-lg shadow-xl p-6 box-border"
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold text-gray-900">Reset Password</h2>
                    <button
                        onClick={() => {
                            setShowModal(false);
                            setFPEmail({ ...FPEmail, email: "" });
                        }}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                    Enter your email address and we'll send you a link to reset your password.
                </p>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={handleChange}
                                placeholder="name@example.com"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 box-border"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleForgotPassword}
                        disabled={!FPEmail?.email}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Send Reset Link
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordModal;
