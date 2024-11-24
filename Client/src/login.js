import React, { useState } from "react";
import "./Styles/Login_SignUp.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username && password) {
      console.log("Logging in with:", { username, password, rememberMe });
    } else {
      setError("Please fill in both fields.");
    }
  };

  return (
    <div className="body">
      <nav className="login-page-using-auto-layoyut-7">
        <div className="login-form-7">
          <div className="frame-27">
            <div className="text-55">Log In</div>
            {error && (
              <p style={{ color: "red", marginTop: 0, marginBottom: 0 }}>
                {error}
              </p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="username-field-3">
                <div className="text-56">USERNAME</div>
                <input
                  type="text"
                  className="username_input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="password-field-3">
                <div className="text-56">PASSWORD</div>
                <input
                  type="password"
                  className="password_input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="sign_in_button-14">
                <div className="text-57">Log in</div>
              </button>
              <div className="signin_sols-8">
                <div className="remember_me-8">
                  <input
                    type="checkbox"
                    id="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="checkbox"
                  />
                  <div className="text-58">Remember Me</div>
                </div>
                <div className="text-59">Forgot Password?</div>
              </div>
            </form>
          </div>
          <div className="frame-28">
            <div className="welcome-to-login-17">
              <div className="welcome-to-login-17 welcome-to-login-17">
                <span className="welcome-to-login-18">Welcome To</span>
                <span className="welcome-to-login-19"> Log In </span>
              </div>
            </div>
            <div className="text-60">Don't have an account?</div>
            <button
              onClick={() =>
                (window.location.href = "http://localhost:4000/signUp")
              }
              className="sign_up_button-6"
            >
              <div className="text-61">Sign Up</div>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Login;
