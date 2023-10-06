import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logInWithEmailAndPassAPI } from "../Redux/action/allFun";

const Login = ({ user, loginWithEmailAndPass }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    loginWithEmailAndPass(email, password);
  };

  useEffect(() => {
    user && navigate("/");
  }, [user]);

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
      <div className="signin">
        <div className="signin_content">
          <h1>Welcome to your professional community</h1>
          <form className="signin_content_form" onSubmit={handleSubmit}>
            <div>
              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>

            <div>
              <label>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>

            <p onClick={() => navigate("/ForgotPassword")}>Forgot password?</p>
            <button type="submit">Login</button>
            <p onClick={() => navigate("/SignUp")}>
              Dont have an account ? Register
            </p>
          </form>
        </div>

        <div className="signin_photo">
          <img src="/src/assets/SignPhoto.svg" alt="SignPhoto" />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginWithEmailAndPass: (email, password) =>
      dispatch(logInWithEmailAndPassAPI(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
