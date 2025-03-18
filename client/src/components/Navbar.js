import React from "react";
import { Link, useHistory } from "react-router-dom"; // Use useHistory instead of useNavigate
import { Compass } from "lucide-react";

function Navbar() {
  const history = useHistory(); // Initialize the history object

  // Function to handle redirection
  const handleSignUpClick = () => {
    history.push("/main"); // Use history.push to navigate to /main
  };

  return (
    <nav className="bg-white border-b border-gray-100 fixed w-full top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Compass className="w-8 h-8 text-blue-600 transition-transform group-hover:rotate-90 duration-300" />
            <span className="text-xl font-bold text-gray-900">MentorLink</span>
          </Link>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              Sign in
            </button>
            <button
              onClick={handleSignUpClick} // Attach the onClick event handler here
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-105"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
