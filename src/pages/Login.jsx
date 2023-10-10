import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logInWithEmailAndPassAPI } from "../Redux/action/allFun";
import images from "../constants/images";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(logInWithEmailAndPassAPI(email, password));
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
          <img src={images.SignPhoto} alt="SignPhoto" />
        </div>
      </div>
    </>
  );
};

export default Login;
