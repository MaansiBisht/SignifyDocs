import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Make sure to import the auth object

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      console.log(currentUser)
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold text-black">SignifyDocs</h1>
        <div className="flex items-center space-x-6 md:space-x-8">
          {/* Mobile Menu Button */}
          <button
            className="block md:hidden text-black"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-black font-medium hover:text-gray-600 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/form"
                  className="text-black font-medium hover:text-gray-600 transition-colors"
                >
                  Create Document
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-500 font-medium hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-black font-medium hover:text-gray-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white p-4 space-y-4`}
      >
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="text-black font-medium hover:text-gray-600 transition-colors block"
            >
              Dashboard
            </Link>
            <Link
              to="/form"
              className="text-black font-medium hover:text-gray-600 transition-colors block"
            >
              Create Document
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-500 font-medium hover:text-red-600 transition-colors block"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-black font-medium hover:text-gray-600 transition-colors block"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors block"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>


  );
};

export default Navbar;
