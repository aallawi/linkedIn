import React from "react";

const RightHome = () => {
  return (
    <div className="rightHome">
      <div className="content">
        <div className="hashtag_title">
          <p>Add to you feed</p>
          <img src="/src/assets/feed-icon.svg" alt="" />
        </div>
        <div className="hashtag">
          <img src="/src/assets/right_reactJs.svg" alt="" />
          <div>
            <h4> React Js</h4>
            <p>JavaScript library maintained by Facebook</p>
            <button className="follow"> + Follow</button>
          </div>
        </div>

        <div className="hashtag">
          <img src="/src/assets/right_firebase.svg" alt="" />
          <div>
            <h4> Firebase</h4>
            <p>platform that provides a multitude of features</p>
            <button className="follow"> + Follow</button>
          </div>
        </div>

        <div className="hashtag">
          <img src="/src/assets/right_sass.svg" alt="" />
          <div>
            <h4> SASS</h4>
            <p>Stands for Syntactically Awesome Stylesheet</p>
            <button className="follow"> + Follow</button>
          </div>
        </div>
        <p className="recommendations">
          View all recommendations
          <img src="/src/assets/right-icon.svg" alt="" />
        </p>
      </div>
      <div className="photo">
        <img src="/src/assets/banner-image.jpg" alt="" />
      </div>
    </div>
  );
};

export default RightHome;
