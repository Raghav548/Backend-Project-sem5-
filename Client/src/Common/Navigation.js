import {NavLink, Outlet} from "react-router-dom"; // NavLink is just like anchor tag with "automatic active class invoking" property. NavLink just creates Navigation links for Router.

const Header = () => {
  

  const user = false; 
  return (
    <>
    <nav className="navbar">
      <img src="/images/Logo.png" alt="Campus Sphere" />

      <ul className="nav-list">
        <li><NavLink to={window.location.pathname === "/admin" ? "/admin" : "/"}>Home</NavLink></li>
        <li><NavLink to={window.location.pathname === "/admin/student" ? "/admin/student" : "/student"}>Student Info</NavLink></li>
        <li><NavLink to={window.location.pathname === "/admin/attendance" ? "/admin/attendance" : "/attendance"}>Attendance</NavLink></li>
        <li><NavLink to={window.location.pathname === "/admin/performance" ? "/admin/performance" : "/performance"}>Performance</NavLink></li>
        <li><NavLink to={window.location.pathname === "/admin/contact" ? "/admin/contact" : "/contact"}>Contact Us</NavLink></li>
        <div className="auth-buttons">
          <NavLink className="signup" to="/signup">Sign up</NavLink>
          <span>|</span>
          {user ? (
            <NavLink className="login" to="/logout">Logout</NavLink>
          ) : (
            <NavLink className="login" to="/login">Login</NavLink>
          )}
        </div>
      </ul>
    </nav>

    <Outlet /> {/* <Outlet> is a component provided by React Router to render child routes within a parent route. It acts as a placeholder for the content of the nested routes defined in your route configuration. */}
    </>
  )
};

export default Header;
