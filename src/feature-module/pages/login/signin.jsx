import React, { useState } from "react";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { all_routes } from "../../../Router/all_routes";
// import "./_signin.scss";

const Signin = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const route = all_routes;

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-box animate-entry">
        <div className="signin-header fade-in delay-1">
          <ImageWithBasePath
            src="assets/img/logo.png"
            alt="Logo"
            className="signin-logo"
          />
          <h2>Welcome Back</h2>
          <p>Login to continue managing your orders.</p>
        </div>

        <form className="signin-form">
          <div className="form-group float-label delay-2">
            <input
              type="email"
              className="form-control"
              defaultValue={"rajaisexcellent@gmail.com"}
              required
            />
            <label>Username</label>
          </div>

          <div className="form-group float-label delay-3">
            <div className="password-wrapper">
              <input
                type={isPasswordVisible ? "text" : "password"}
                className="form-control"
                defaultValue={"password123"}
                required
              />
              <label>Password</label>
              <span
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <div className="form-options delay-4">
            <label className="checkbox">
              <input type="checkbox" /> Remember me
            </label>
            <Link to={route.forgotPassword} className="forgot-link">
              Forgot password?
            </Link>
          </div>

          <Link to={route.newdashboard} className="signin-button delay-5">
            Sign In
          </Link>
        </form>

        <div className="signin-footer fade-in delay-6">
          <p>© 2025 NXI. Future-ready experience.</p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
