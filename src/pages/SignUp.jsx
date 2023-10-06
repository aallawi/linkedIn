import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  signInWithGoogleAPI,
  signInWithEmailAndPassAPI,
} from "../Redux/action/allFun";

const SignUp = ({ user, signinWithGoogle, signinWithEmailAndPass }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    signinWithEmailAndPass(name, email, password);
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
                Full Name
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
            </div>
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
            <p className="login" onClick={() => navigate("/Login")}>
              already have an account ? Login
            </p>
            <button type="submit">SignIn</button>
          </form>

          <div className="signin_content_line">
            <span className="line"></span>
            <span className="or">or</span>
            <span className="line"></span>
          </div>

          <button
            className="signin_content_google"
            onClick={() => signinWithGoogle()}
          >
            <img src="/src/assets/google.svg" alt="google logo" />
            <p>Sign in with Google</p>
          </button>
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
    signinWithGoogle: () => dispatch(signInWithGoogleAPI()),
    signinWithEmailAndPass: (name, email, password) =>
      dispatch(signInWithEmailAndPassAPI(name, email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
