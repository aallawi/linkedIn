import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const handleResetPassword = (e) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetMessage("Password reset email sent. Check your inbox.");

        setTimeout(() => {
          navigate("/Login");
        }, 20000);
      })
      .catch((error) => {
        console.error("Password reset error:", error);
        setResetMessage("Password reset failed. Please try again.");
      });
  };

  return (
    <>
      <div className="nav">
        <div className="nav_logo">
          <img src="/src/assets/login-logo.svg" alt="logo" />
        </div>
        <div className="nav_button">
          <button className="join">join Now</button>
          <button className="signUp" onClick={() => navigate("/SignUp")}>
            Sign Up
          </button>
        </div>
      </div>
      <div className="forgotPass">
        <div className="forgotPass_content">
          <h1>Forgot Password</h1>
          <p>Enter your email to reset your password:</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button onClick={handleResetPassword}>Reset Password</button>
          <p className="GuidanceMessage">{resetMessage}</p>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
