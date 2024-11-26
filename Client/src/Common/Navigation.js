import { useState, useEffect } from "react";
import { NavLink, Navigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is installed and imported

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default: Not authenticated
  const [isAdmin, setIsAdmin] = useState(false); // Default: Not admin
  // Check authentication status when the component mounts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/auth/verify", {
          withCredentials: true, // Send cookies for auth
        });

        // Ensure valid response data
        const userData = response.data;
        if (userData && userData.username) {
          setIsAuthenticated(true); // User is authenticated
          console.log("Fullname:", userData.username);
          setIsAdmin(userData.username === "admin"); // Check if admin
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error.response?.data || error.message);
        setIsAuthenticated(false); // Not authenticated
      }
    };
    checkAuth();
  }, []);
 
  // Function to handle logout
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/auth/logout",
        {},
        { withCredentials: true } // Send cookies to server
      );
      setIsAuthenticated(false); // Update state
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
    <nav className="navbar">
      <img src="/images/Logo.png" alt="Campus Sphere" />

      <ul className="nav-list">
        <li><NavLink to={isAdmin ? "/admin" : "/"}>Home</NavLink></li>
       <li><NavLink to={isAdmin ? "/admin/student" : "/student"}>Student Info</NavLink></li>
        <li><NavLink to={isAdmin ? "/admin/attendance" : "/attendance"}>Attendance</NavLink></li>
        <li><NavLink to={isAdmin ? "/admin/performance" : "/performance"}>Performance</NavLink></li>
        <li><NavLink to = {isAdmin ? "/admin/contact" : "/contact"}>Contact Us</NavLink></li>
        <div className="auth-buttons">
          {isAuthenticated ? (
            <>
              <NavLink className="logout" onClick={handleLogout} style={{ cursor: "pointer" ,color:"white"}}>Logout</NavLink>
            </>
          ) : (
            <>
              <NavLink className="signup" to="/signup">Sign up</NavLink>
              <span>|</span>
              <NavLink className="login" to="/login">Login</NavLink>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Header;
