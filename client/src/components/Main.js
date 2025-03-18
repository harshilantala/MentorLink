
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { Roles } from "../utility";
import bg from "../assets/images/bg-2.png";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
// import ArrowRight from "../assets/icons/ArrowRight";
import { ArrowRight, Rocket, Users, GraduationCap } from "lucide-react";

const Main = () => {
  const user = JSON.parse(localStorage.getItem("authData"));
  const history = useHistory();

  // redirect the user to the required dashboard if user is present
  if (user?.role === Roles.ADMIN) {
    history.push("/admin/dashboard");
  }
  if (user?.role === Roles.MENTOR) {
    history.push("/mentor/dashboard");
  }
  if (user?.role === Roles.STUDENT) {
    history.push("/mentee/dashboard");
  }

  const [value, setValue] = useState("Admin");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const roleIcons = {
    Admin: <Rocket className="w-6 h-6" />,
    Mentor: <Users className="w-6 h-6" />,
    Mentee: <GraduationCap className="w-6 h-6" />,
  };

  console.log("selection", value);

  return (
    <div className="w-full h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 bg-gradient-to-br from-white to-blue-50 h-full flex flex-col items-center justify-center px-12">
        <div className="max-w-2xl">
          {/* <h1 className="text-7xl font-bold mb-4">
                        <span className="text-blue-600">Welcome</span> to
                    </h1>
                    <h2 className="text-5xl font-bold text-gray-800 mb-8">
                        Mentor Link
                    </h2>
                    <p className="text-gray-600 text-xl mb-8">
                        Connect, learn, and grow with our mentorship platform that brings together mentors and mentees.
                    </p> */}
          {/* <img 
                        src="/images/illustrator_1.svg"
                        alt="Mentorship Illustration" 
                        className="w-full max-w-lg mx-auto transform hover:scale-105 transition-transform duration-300"
                    /> */}
          <div className="relative w-full max-w-lg mx-auto overflow-hidden">
            <img
              src="/images/illustrator_1.png"
              alt="Mentorship Illustration"
              className="w-full hover:brightness-110 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 h-full flex flex-col items-center justify-center px-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Choose Your Role
          </h2>

          <div className="space-y-4 mb-8">
            {["Admin", "Mentor", "Mentee"].map((role) => (
              <div
                key={role}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  value === role
                    ? "bg-white text-blue-600 shadow-lg transform -translate-y-1"
                    : "bg-blue-700/7 text-white hover:bg-blue-700/70"
                }`}
                onClick={() => setValue(role)}
              >
                <div className="flex items-center space-x-4">
                  {roleIcons[role]}
                  <div className="flex-1">
                    <h3 className="font-semibold">{role}</h3>
                    <p
                      className={`text-sm ${
                        value === role ? "text-blue-600/70" : "text-blue-100/70"
                      }`}
                    >
                      Join as a {role.toLowerCase()}
                    </p>
                  </div>
                  <Radio
                    checked={value === role}
                    onChange={handleChange}
                    value={role}
                    name="role-radio"
                    sx={{
                      color: value === role ? "#2563eb" : "white",
                      "&.Mui-checked": {
                        color: "#2563eb",
                      },
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <Link
            to={{
              pathname: `/${value.toLowerCase()}`,
              state: value,
            }}
            className="w-full bg-white text-blue-600 py-4 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-blue-50 transition-colors duration-200 shadow-lg group"
          >
            <span>Continue as {value}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
