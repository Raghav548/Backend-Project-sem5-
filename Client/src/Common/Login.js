import '../Styles/login_signup.css';

const LoginPage = () => {
  // const [formData, setFormData] = useState({
  //   username: '',
  //   password: '',
  //   rememberMe: false,
  // });

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: type === 'checkbox' ? checked : value,
  //   }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission logic here
  //   console.log(formData);
  // };

  const error = null;

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Login</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="Webflow" name="generator" />
        <link href="css/login_SignUp.css" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          href="https://fonts.gstatic.com"
          rel="preconnect"
          crossOrigin="anonymous"
        />
        <script
          src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
          type="text/javascript"
        ></script>
        <script type="text/javascript">
          {`WebFont.load({
            google: {
              families: [
                "Gothic A1:300,regular,500,600,700,800",
                "Outfit:100,200,300,regular,500,600,700,800,900",
              ],
            },
          });`}
        </script>
        <link href="images/favicon.png" rel="shortcut icon" type="image/x-icon" />
        <link href="images/app-icon.png" rel="apple-touch-icon" />
      </head>
      <body className="body">
        <nav className="login-page-using-auto-layoyut-7">
          <div className="login-form-7">
            <div className="frame-27">
              <div className="text-55">Log In</div>
              {error && (
                <p style={{ color: 'red', marginTop: 0, marginBottom: 0 }}>{error}</p>
              )}
              <form action="/login" method="POST">                {/*Form begins here*/}
                <div className="username-field-3">
                  <div className="text-56">USERNAME</div>
                  <input
                    type="text"
                    className="username_input"
                    name="username"
                    // value={formData.username}
                    // onChange={handleChange}
                    required
                  />
                </div>
                <div className="password-field-3">
                  <div className="text-56">PASSWORD</div>
                  <input
                    type="password"
                    className="password_input"
                    name="password"
                    // value={formData.password}
                    // onChange={handleChange}
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
                      name="rememberMe"
                      className="checkbox"
                      // checked={formData.rememberMe}
                      // onChange={handleChange}
                    />
                    <div className="text-58">Remember Me</div>
                  </div>
                  <div className="text-59">Forgot Password?</div>
                </div>
              </form>
            </div>
            <div className="frame-28">
              <div className="welcome-to-login-17">
                <span className="welcome-to-login-18">Welcome To</span>
                <span className="welcome-to-login-19"> Log In </span>
              </div>
              <div className="text-60">Don't have an account?</div>
              <button
                onClick={() => (window.location.href = 'http://localhost:3000/signup')}
                className="sign_up_button-6"
              >
                <div className="text-61">Sign Up</div>
              </button>
            </div>
          </div>
        </nav>
      </body>
    </html>
  );
};

export default LoginPage;
