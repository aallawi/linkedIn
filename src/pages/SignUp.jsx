import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInWithGoogleAPI,
  signInWithEmailAndPassAPI,
} from "../Redux/action/allFun";
import images from "../constants/images";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signInWithEmailAndPassAPI(name, email, password));
  };

  useEffect(() => {
    user && navigate("/");
  }, [user]);

  return (
    <>
      <div className="nav">
        <div className="nav_logo">
          <img src={images.loginLogo} alt="logo" />
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
            onClick={() => dispatch(signInWithGoogleAPI())}
          >
            <img src={images.google} alt="google logo" />
            <p>Sign in with Google</p>
          </button>
        </div>

        <div className="signin_photo">
          <img src={images.SignPhoto} alt="SignPhoto" />
        </div>
      </div>
    </>
  );
};

export default SignUp;
