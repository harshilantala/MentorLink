import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { Checkbox, FormControlLabel } from "@mui/material";
import { CSSTransition } from "react-transition-group";

import { adminSignIn } from "../../actions/admin";
import { mentorSignIn, mentorSignUp } from "../../actions/mentor";
import { studentSignIn, studentSignUp } from "../../actions/student";
import ArrowRight from "../../assets/icons/ArrowRight";
import { showToast } from "../toast/toast";
import ModalOverlay from "../modal/ModalOverlay";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { verifyRecaptcha } from "../../actions";

const Auth = ({ location }) => {
  const [toggleLogin, setToggleLogin] = useState(false);
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    password: "",
    confirmPassword: "",
    enrollmentNo: "",
    semester: "",
    department: "",
    experience: "",
    specialization: "",
    qualificationProof: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPass, setShowPass] = useState("password");
  const [FPEmail, setFPEmail] = useState({
    role: location.state,
    email: "",
  });
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (location.state === undefined) {
      history.goBack();
    }
  }, [location.state, history]);

  const resetFields = () => {
    setFields({
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      password: "",
      confirmPassword: "",
      enrollmentNo: "",
      semester: "",
      department: "",
      experience: "",
      specialization: "",
      qualificationProof: null,
    });
  };

  const handleToggle = () => {
    setToggleLogin(!toggleLogin);
    resetFields();
  };

  const handleChange = (e) => {
    if (e.target.name === "semester" && e.target.value === "") return;
    setFields({ ...fields, [e.target.name]: e.target.value.trim() });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFields({ ...fields, [e.target.name]: e.target.files[0] });
    }
  };

  const handlePasswordShowToggle = () => {
    setShowPass(showPass === "password" ? "text" : "password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!fields || Object.keys(fields).length === 0) {
      showToast(
        "error",
        "All fields are required",
        5000,
        toast.POSITION.TOP_RIGHT
      );
      return;
    }

    const formData = new FormData();
    Object.keys(fields).forEach((key) => {
      formData.append(key, fields[key]);
    });

    try {
      if (location.state === "Admin") {
        dispatch(adminSignIn(fields, history));
      } else if (location.state === "Mentor") {
        if (toggleLogin) {
          if (fields.password !== fields.confirmPassword) {
            showToast(
              "error",
              "Passwords do not match",
              5000,
              toast.POSITION.TOP_RIGHT
            );
            return;
          }
          await dispatch(mentorSignUp(formData, handleToggle));
        } else {
          await dispatch(mentorSignIn(fields, history));
        }
      } else if (location.state === "Mentee") {
        if (toggleLogin) {
          if (fields.password !== fields.confirmPassword) {
            showToast(
              "error",
              "Passwords do not match",
              5000,
              toast.POSITION.TOP_RIGHT
            );
            return;
          }
          await dispatch(studentSignUp(fields, handleToggle));
        } else {
          await dispatch(studentSignIn(fields, history));
        }
      }

      resetFields();
      showToast(
        "success",
        "Submitted successfully!",
        3000,
        toast.POSITION.TOP_RIGHT
      );
    } catch (error) {
      console.error("Submission Error:", error);
      showToast(
        "error",
        "Failed to submit. Try again.",
        5000,
        toast.POSITION.TOP_RIGHT
      );
    }
  };

  // Determine if we're showing the mentorSignUp form
  const isMentorSignUp = toggleLogin && location.state === "Mentor";

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Left side - illustration/branding area */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br flex-col justify-center items-center p-12"
           style={{
             background: location.state === "Mentor" 
               ? "linear-gradient(to bottom right, #4F46E5, #818CF8)" 
               : location.state === "Mentee" 
                 ? "linear-gradient(to bottom right, #2563EB, #60A5FA)" 
                 : "linear-gradient(to bottom right, #1E40AF, #3B82F6)"
           }}>
        <div className="max-w-lg">
          
          <h1 className="text-5xl font-bold text-white mb-6">
            {location.state === "Mentor" 
              ? "Share Knowledge, Inspire Growth" 
              : location.state === "Mentee" 
                ? "Learn, Grow, Achieve" 
                : "Platform Management"}
          </h1>
          <p className="text-blue-100 text-xl leading-relaxed mb-8">
            {location.state === "Mentor"
              ? toggleLogin
                ? "Join our community of mentors and help shape the next generation of professionals through your expertise and guidance."
                : "Welcome back, mentor! Continue your journey of guiding and inspiring learners."
              : location.state === "Mentee"
                ? toggleLogin
                  ? "Connect with experienced mentors who will guide you through your learning journey and help you achieve your goals."
                  : "Welcome back, mentee! Continue your learning journey with guidance from expert mentors."
                : "Access administrative tools to manage and optimize the mentorship platform experience."}
          </p>
          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg">
            <h3 className="text-white text-lg font-medium mb-2">
              {location.state === "Mentor"
                ? "As a Mentor, you can:"
                : location.state === "Mentee"
                  ? "As a Mentee, you can:"
                  : "As an Admin, you can:"}
            </h3>
            <ul className="text-blue-100 space-y-2">
              {location.state === "Mentor" ? (
                <>
                  <li className="flex items-center">
                    <span className="mr-2">•</span> Create personalized learning plans
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span> Share your industry expertise
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span> Guide students through challenges
                  </li>
                </>
              ) : location.state === "Mentee" ? (
                <>
                  <li className="flex items-center">
                    <span className="mr-2">•</span> Connect with expert mentors
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span> Access structured learning paths
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span> Track your progress and growth
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center">
                    <span className="mr-2">•</span> Manage user accounts and access
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span> Monitor platform performance
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span> Generate reports and analytics
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Right side - form area */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-4 sm:p-8">
        <div className={`w-full max-w-md ${isMentorSignUp ? "max-w-lg" : ""}`}>
          {/* Modal for forgot password */}
          <CSSTransition
            nodeRef={overlayRef}
            in={showModal}
            timeout={300}
            classNames="overlay"
            unmountOnExit
          >
            <ModalOverlay nodeRef={overlayRef} />
          </CSSTransition>
          
          <CSSTransition
            nodeRef={modalRef}
            in={showModal}
            timeout={300}
            classNames="modal"
            unmountOnExit
          >
            <ForgotPasswordModal
              nodeRef={modalRef}
              setShowModal={setShowModal}
              setFPEmail={setFPEmail}
              FPEmail={FPEmail}
            />
          </CSSTransition>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              {location.state}{" "}
              <span className="text-blue-600">
                {toggleLogin ? "Sign Up" : "Sign In"}
              </span>
            </h2>
            <p className="text-gray-600 mt-2">
              {toggleLogin
                ? "Create your account to get started"
                : "Sign in to access your account"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields - Only show on signup */}
            {toggleLogin && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={fields.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={fields.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>
            )}

            {/* Mentee specific fields */}
            {toggleLogin && location.state === "Mentee" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="enrollmentNo"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Enrollment No.
                  </label>
                  <input
                    id="enrollmentNo"
                    name="enrollmentNo"
                    type="text"
                    value={fields.enrollmentNo.toUpperCase()}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="ENR123456"
                  />
                </div>
                <div>
                  <label
                    htmlFor="semester"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Semester
                  </label>
                  <select
                    id="semester"
                    name="semester"
                    value={fields.semester}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select semester</option>
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i} value={`${i + 1}${["st", "nd", "rd"][i] || "th"} semester`}>
                        {i + 1}{["st", "nd", "rd"][i] || "th"} semester
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Mentor specific fields */}
            {toggleLogin && location.state === "Mentor" && (
              <>
                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={fields.department}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select department</option>
                    <option value="Computer Science & Engineering">
                      Computer Science & Engineering
                    </option>
                    {/* Add more departments as needed */}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Experience (years)
                    </label>
                    <input
                      id="experience"
                      name="experience"
                      type="number"
                      min="0"
                      value={fields.experience}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="5"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="specialization"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Specialization
                    </label>
                    <input
                      id="specialization"
                      name="specialization"
                      type="text"
                      value={fields.specialization}
                      onChange={handleChange}
                      required
                      placeholder="Machine Learning, Web Dev, etc."
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="qualificationProof"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Qualification Proof
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4h-12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="qualificationProof"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="qualificationProof"
                            name="qualificationProof"
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            required
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, JPG, PNG up to 10MB
                      </p>
                      {fields.qualificationProof && (
                        <p className="text-sm text-green-600">
                          File selected: {typeof fields.qualificationProof === 'object' ? 
                            fields.qualificationProof.name : 'File selected'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Department field (for non-mentor signups) */}
            {toggleLogin && location.state !== "Mentor" && (
              <div>
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={fields.department}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select department</option>
                  <option value="Computer Science & Engineering">
                    Computer Science & Engineering
                  </option>
                  {/* Add more departments as needed */}
                </select>
              </div>
            )}

            {/* Email field - always visible */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={fields.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Password fields */}
            {toggleLogin ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type={showPass}
                    value={fields.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPass}
                    value={fields.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPass}
                  value={fields.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="••••••••"
                />
                {!toggleLogin && (
                    <button
                      type="button"
                      onClick={() => setShowModal(true)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Forgot password?
                    </button>
                  )}
              </div>
            )}

            {/* Show password checkbox */}
            <div className="flex items-center">
              <FormControlLabel
                onChange={handlePasswordShowToggle}
                control={
                  <Checkbox
                    sx={{
                      color: "#3B82F6",
                      "&.Mui-checked": {
                        color: "#3B82F6",
                      },
                    }}
                  />
                }
                label={
                  <span className="text-sm text-gray-700">Show password</span>
                }
              />
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 shadow-md"
              >
                {toggleLogin ? "Create Account" : "Sign in"}
                <ArrowRight
                  alt={false}
                  myStyle={"h-4 w-4 group-hover:translate-x-2 transform transition"}
                />
              </button>
            </div>
          </form>

          {/* Toggle between signin/signup */}
          {location.state !== "Admin" && (
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {toggleLogin ? "Already have an account?" : "Don't have an account?"}
                <button
                  onClick={handleToggle}
                  className="ml-2 text-blue-600 hover:text-blue-800 font-medium"
                >
                  {toggleLogin ? "Sign in" : "Sign up"}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer limit={5} draggable={false} pauseOnFocusLoss={false} />
    </div>
  );
};

export default Auth;