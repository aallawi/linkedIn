import React from "react";
import { connect } from "react-redux";

const LeftHome = ({ user }) => {
  return (
    <div className="leftHome">
      <img src="/src/assets/card-bg.svg" alt="" />
      <div className="line">
        {user && user.photoURL ? (
          <img src={user.photoURL} />
        ) : (
          <img src="/src/assets/user.svg" alt="user" />
        )}
      </div>
      <div className="user">
        <h4>Welcome, {user ? user.displayName : "there!"}</h4>
        <p>{user ? user.email : ""}</p>
      </div>
      <div className="line" />
      <div className="info">
        <div>
          <p>Who's vieweded your profile</p>
          <span>{Math.floor(Math.random() * (1401 - 1200) + 1200)}</span>
          {/* 1200 => 1400 */}
        </div>
        <div>
          <p>Imperssion of your post</p>
          <span>{Math.floor(Math.random() * (901 - 700) + 700)}</span>
          {/* 700 => 900 */}
        </div>
      </div>
      <div className="line" />
      <div className="myItem">
        <img src="/src/assets/item-icon.svg" alt="My Item" />
        <p>My items</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(LeftHome);