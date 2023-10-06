import React from "react";
import { sinOutAPI } from "../Redux/action/allFun";
import { connect } from "react-redux";
import { AiFillMessage } from "react-icons/ai";

const Navbar = ({ user, sinOut }) => {
  return (
    <div>
      <nav>
        <div className="nav_logo">
          <img src="/src/assets/home-logo.svg" alt="logo" />
          <div className="input_app">
            <img className="icon" src="/src/assets/search-icon.svg" alt="" />
            <input type="text" placeholder="Seach" />
          </div>
          <div className="iconMess">
            <AiFillMessage />
          </div>
        </div>

        <div className="nav_list">
          <ul className="nav_links">
            <li className="nav_link active">
              <img src="/src/assets/nav-home.svg" alt="Home" />
              <span>Home</span>
            </li>
            <li className="nav_link">
              <img src="/src/assets/nav-network.svg" alt="My Network" />
              <span>My Network</span>
            </li>
            <li className="nav_link">
              <img src="/src/assets/nav-jobs.svg" alt="Jobs" />
              <span>Jobs</span>
            </li>
            <li className="nav_link">
              <img src="/src/assets/nav-messaging.svg" alt="Messaging" />
              <span>Messaging</span>
            </li>
            <li className="nav_link">
              <img
                src="/src/assets/nav-notifications.svg"
                alt="Notifications"
              />
              <span>Notifications</span>
            </li>
            <li className="nav_link">
              <div className="dropdown">
                <a>
                  {user && user.photoURL ? (
                    <img src={user.photoURL} />
                  ) : (
                    <img src="/src/assets/user.svg" alt="" />
                  )}

                  <span>
                    Me
                    <img src="/src/assets/down-icon.svg" alt="" />
                  </span>
                </a>
                <div className="dropdown-content" onClick={() => sinOut()}>
                  <a>Sign Out</a>
                </div>
              </div>
            </li>
            <li className="nav_link">
              <a>
                <img src="/src/assets/nav-work.svg" alt="" />
                <span>
                  Work
                  <img src="/src/assets/down-icon.svg" alt="" />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sinOut: () => dispatch(sinOutAPI()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
