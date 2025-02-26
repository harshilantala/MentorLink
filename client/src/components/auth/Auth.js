import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { adminSignIn } from "../../actions/admin";
import { mentorSignIn, mentorSignUp } from "../../actions/mentor";
import { studentSignIn, studentSignUp } from "../../actions/student";
import ArrowRight from "../../assets/icons/ArrowRight";
import loginBg from "../../assets/images/login.png";
import { toast, ToastContainer } from "react-toastify";
import { showToast } from "../toast/toast";
import { Checkbox, FormControlLabel } from "@mui/material";
import { CSSTransition } from "react-transition-group";
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
  });
  const dispatch = useDispatch();
  const history = useHistory();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.state === "Admin") {
      dispatch(adminSignIn(fields, history));
    } else if (location.state === "Mentor") {
      if (toggleLogin === true) {
        if (fields.password !== fields.confirmPassword) {
          showToast(
            "error",
            "passwords doesn't match",
            5000,
            toast.POSITION.TOP_RIGHT
          );
          return;
        }
        dispatch(mentorSignUp(fields, handleToggle));
      } else {
        dispatch(mentorSignIn(fields, history));
      }
    } else if (location.state === "Mentee") {
      if (toggleLogin === true) {
        if (fields.password !== fields.confirmPassword) {
          showToast(
            "error",
            "passwords doesn't match",
            5000,
            toast.POSITION.TOP_RIGHT
          );
          return;
        }
        dispatch(studentSignUp(fields, handleToggle));
      } else {
        dispatch(studentSignIn(fields, history));
      }
    }
    resetFields();
  };

  const [showPass, setShowPass] = useState("password");
  const [FPEmail, setFPEmail] = useState({
    role: location.state,
    email: "",
  });

  const handlePasswordShowToggle = () => {
    if (showPass === "password") setShowPass("text");
    if (showPass === "text") setShowPass("password");
  };

  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  return (
    <div className="w-full min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-blue-100">
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

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        <div className="hidden md:flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            {location.state} {toggleLogin ? "Sign Up" : "Sign In"}
          </h1>
          <img
            src="/images/illustrator_2.png"
            alt="Illustrator background"
            className="w-3/4 object-contain"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-h-screen overflow-y-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 md:hidden text-center">
            {location.state} {toggleLogin ? "Sign Up" : "Sign In"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {toggleLogin && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={fields.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="middleName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Middle name
                  </label>
                  <input
                    id="middleName"
                    name="middleName"
                    type="text"
                    value={fields.middleName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={fields.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

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
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select semester</option>
                    <option value="1st semester">1st semester</option>
                    <option value="2nd semester">2nd semester</option>
                    <option value="3rd semester">3rd semester</option>
                    <option value="4th semester">4th semester</option>
                    <option value="5th semester">5th semester</option>
                    <option value="6th semester">6th semester</option>
                    <option value="7th semester">7th semester</option>
                    <option value="8th semester">8th semester</option>
                    <option value="9th semester">9th semester</option>
                    <option value="10th semester">10th semester</option>
                  </select>
                </div>
              </div>
            )}

            {toggleLogin && (
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
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select department</option>
                  <option value="Computer Science & Engineering">
                    Computer Science & Engineering
                  </option>
                </select>
              </div>
            )}

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
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

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
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {toggleLogin && (
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
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
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
                label="Show password"
              />
              {!toggleLogin && (
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Forgot password?
                </button>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-blue-500 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {toggleLogin ? "Sign up" : "Sign in"}
              <ArrowRight
                alt={false}
                myStyle={
                  "h-4 w-4 group-hover:translate-x-2 transform transition"
                }
              />
            </button>
          </form>

          {location.state !== "Admin" && (
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {toggleLogin
                  ? "Already have an account?"
                  : "Don't have an account?"}
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
