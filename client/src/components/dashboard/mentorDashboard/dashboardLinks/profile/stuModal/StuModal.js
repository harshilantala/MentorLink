import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { studentUpdateProfileDetails } from "../../../../../../actions/student";

const StuModal = ({
  stuProfileData,
  setStuProfileData,
  nodeRef,
  setShowOverlay,
  setShowStuProfileModal,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [disable, setDisable] = useState(true);
  const [activeTab, setActiveTab] = useState("academic");
  const [isAnimating, setIsAnimating] = useState(false);

  // function to update the state for the profile data
  const handleChange = (e) => {
    setDisable(false);
    setStuProfileData({ ...stuProfileData, [e.target.name]: e.target.value });
  };

  // function to handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(studentUpdateProfileDetails(history, stuProfileData));
    handleModalActions();
  };

  // function to handle modal actions
  const handleModalActions = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowOverlay(false);
      setShowStuProfileModal(false);
    }, 300);
  };

  // Switch tabs with animation
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  // Entry animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-40 transition-opacity duration-300">
      <div
        ref={nodeRef}
        className={`w-11/12 max-w-6xl bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 transform ${
          isAnimating ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white flex items-center justify-between">
          <h2 className="text-2xl font-bold">Student Profile</h2>
          <button
            onClick={handleModalActions}
            className="text-white hover:bg-blue-700 rounded-full p-2 transition-all duration-200 hover:rotate-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-gray-100 p-2 flex space-x-1">
          <button
            onClick={() => handleTabSwitch("academic")}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              activeTab === "academic"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            Academic
          </button>
          <button
            onClick={() => handleTabSwitch("personal")}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              activeTab === "personal"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            Personal
          </button>
          <button
            onClick={() => handleTabSwitch("residence")}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              activeTab === "residence"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            Residence
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          <form onSubmit={handleSubmit}>
            {/* Academic Information */}
            <div
              className={`transition-all duration-300 ${
                activeTab === "academic"
                  ? "opacity-100 h-auto"
                  : "opacity-0 h-0 overflow-hidden absolute"
              }`}
            >
              <div className="pb-4 mb-6 border-b-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                  Academic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="group">
                  <label
                    htmlFor="department"
                    className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={stuProfileData.department}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select department</option>
                    <option value="Computer Science & Engineering">
                      Computer Science & Engineering
                    </option>
                  </select>
                </div>

                <div className="group">
                  <label
                    htmlFor="programme"
                    className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    Programme
                  </label>
                  <select
                    id="programme"
                    name="programme"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={stuProfileData.programme}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select programme</option>
                    <option value="B.Tech(CSE)">B.Tech (CSE)</option>
                    <option value="MCA">MCA</option>
                    <option value="M.Tech(IT)">M.Tech (IT)</option>
                    <option value="M.Tech(CSE)">M.Tech (CSE)</option>
                  </select>
                </div>

                <div className="group">
                  <label
                    htmlFor="semester"
                    className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    Semester
                  </label>
                  <select
                    id="semester"
                    name="semester"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={stuProfileData.semester}
                    onChange={handleChange}
                    required
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
                  </select>
                </div>

                <div className="group">
                  <label
                    htmlFor="enrollment_no"
                    className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    Enrollment Number
                  </label>
                  <input
                    id="enrollment_no"
                    type="text"
                    name="enrollment_no"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={stuProfileData.enrollment_no}
                    onChange={handleChange}
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="enrollment_year"
                    className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    Enrollment Year
                  </label>
                  <input
                    id="enrollment_year"
                    type="text"
                    name="enrollment_year"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={stuProfileData.enrollment_year}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mt-6 pb-4 mb-6 border-b-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Contact Details
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label
                    htmlFor="phone_no"
                    className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone_no"
                    type="text"
                    name="phone_no"
                    maxLength="10"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={stuProfileData.phone_no}
                    onChange={handleChange}
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={stuProfileData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div
              className={`transition-all duration-300 ${
                activeTab === "personal"
                  ? "opacity-100 h-auto"
                  : "opacity-0 h-0 overflow-hidden absolute"
              }`}
            >
              <div className="pb-4 mb-6 border-b-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Personal Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="group">
                  <label
                    htmlFor="firstname"
                    className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    First Name
                  </label>
                  <input
                    id="firstname"
                    type="text"
                    name="firstname"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={stuProfileData.firstname}
                    onChange={handleChange}
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="middlename"
                    className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    Middle Name
                  </label>
                  <input
                    id="middlename"
                    type="text"
                    name="middlename"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={stuProfileData.middlename}
                    onChange={handleChange}
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="lastname"
                    className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastname"
                    type="text"
                    name="lastname"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={stuProfileData.lastname}
                    onChange={handleChange}
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={stuProfileData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div className="group">
                  <label
                    htmlFor="blood_group"
                    className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    Blood Group
                  </label>
                  <select
                    id="blood_group"
                    name="blood_group"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={stuProfileData.blood_group}
                    onChange={handleChange}
                  >
                    <option value="">Select group</option>
                    <option value="A+ (positive)">A+ (positive)</option>
                    <option value="B+ (positive)">B+ (positive)</option>
                    <option value="O+ (positive)">O+ (positive)</option>
                    <option value="AB+ (positive)">AB+ (positive)</option>
                    <option value="A- (negative)">A- (negative)</option>
                    <option value="B- (negative)">B- (negative)</option>
                    <option value="O- (negative)">O- (negative)</option>
                    <option value="AB- (negative)">AB- (negative)</option>
                  </select>
                </div>

                <div className="group">
                  <label
                    htmlFor="home_place"
                    className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    Home Place
                  </label>
                  <input
                    id="home_place"
                    type="text"
                    name="home_place"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={stuProfileData.home_place}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mt-6">
                <div className="group">
                  <label
                    htmlFor="guardian_name"
                    className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    Guardian Name
                  </label>
                  <input
                    id="guardian_name"
                    type="text"
                    name="guardian_name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={stuProfileData.guardian_name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="group">
                  <label
                    htmlFor="guardian_ph_no"
                    className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    Guardian Phone Number
                  </label>
                  <input
                    id="guardian_ph_no"
                    type="text"
                    name="guardian_ph_no"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={stuProfileData.guardian_ph_no}
                    onChange={handleChange}
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="guardian_address"
                    className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    Guardian Address
                  </label>
                  <input
                    id="guardian_address"
                    type="text"
                    name="guardian_address"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={stuProfileData.guardian_address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="group">
                  <label
                    htmlFor="hobbies"
                    className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    Hobbies
                  </label>
                  <input
                    id="hobbies"
                    type="text"
                    name="hobbies"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={stuProfileData.hobbies}
                    onChange={handleChange}
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="family_details"
                    className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    Family Details
                  </label>
                  <input
                    id="family_details"
                    type="text"
                    name="family_details"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={stuProfileData.family_details}
                    onChange={handleChange}
                    placeholder="Occupation, members, etc."
                  />
                </div>
              </div>
            </div>

            {/* Residence Information */}
            <div
              className={`transition-all duration-300 ${
                activeTab === "residence"
                  ? "opacity-100 h-auto"
                  : "opacity-0 h-0 overflow-hidden absolute"
              }`}
            >
              <div className="pb-4 mb-6 border-b-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Hostel Information
                </h3>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="group">
                    <label
                      htmlFor="hostel_name"
                      className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                    >
                      Hostel Name
                    </label>
                    <input
                      id="hostel_name"
                      type="text"
                      name="hostel_name"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      value={stuProfileData.hostel_name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="group">
                    <label
                      htmlFor="warden_name"
                      className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                    >
                      Warden's Name
                    </label>
                    <input
                      id="warden_name"
                      type="text"
                      name="warden_name"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      value={stuProfileData.warden_name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="group">
                    <label
                      htmlFor="warden_ph_no"
                      className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                    >
                      Warden's Phone No.
                    </label>
                    <input
                      id="warden_ph_no"
                      type="text"
                      name="warden_ph_no"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      value={stuProfileData.warden_ph_no}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="group">
                    <label
                      htmlFor="asst_warden_name"
                      className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                    >
                      Asst. Warden's Name
                    </label>
                    <input
                      id="asst_warden_name"
                      type="text"
                      name="asst_warden_name"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      value={stuProfileData.asst_warden_name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="group">
                    <label
                      htmlFor="asst_warden_ph_no"
                      className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                    >
                      Asst. Warden's Phone No.
                    </label>
                    <input
                      id="asst_warden_ph_no"
                      type="text"
                      name="asst_warden_ph_no"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      value={stuProfileData.asst_warden_ph_no}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="pb-4 mb-6 border-b-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  Non-Hostel Residence Information
                </h3>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="group">
                    <label
                      htmlFor="responsible_contact_person_at_residence"
                      className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                    >
                      Responsible Contact Person
                    </label>
                    <input
                      id="responsible_contact_person_at_residence"
                      type="text"
                      name="responsible_contact_person_at_residence"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      value={stuProfileData.responsible_contact_person_at_residence}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="group">
                    <label
                      htmlFor="contact_no_of_contact_person"
                      className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                    >
                      Contact Person's Phone
                    </label>
                    <input
                      id="contact_no_of_contact_person"
                      type="text"
                      name="contact_no_of_contact_person"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      value={stuProfileData.contact_no_of_contact_person}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="group">
                    <label
                      htmlFor="residence_address"
                      className="block mb-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                    >
                      Residence Address
                    </label>
                    <input
                      id="residence_address"
                      type="text"
                      name="residence_address"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      value={stuProfileData.residence_address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with update button */}
            <div className="mt-8 border-t pt-6 flex justify-end">
              <button
                type="button"
                onClick={handleModalActions}
                className="px-6 py-2 mr-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={disable}
                className={`px-6 py-2 rounded-lg text-white transition-all duration-300 transform ${
                  disable
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-95"
                }`}
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StuModal;