import React from "react";
import { hashtag } from "../constants/data";
import images from "../constants/images";

const RightHome = () => {
  return (
    <div className="rightHome">
      <div className="content">
        <div className="hashtag_title">
          <p>Add to you feed</p>
          <img src={images.feed} alt="" />
        </div>

        {hashtag.map((item, index) => {
          return (
            <div key={index} className="hashtag">
              <img src={item.img} alt="" />
              <div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <button className="follow"> + Follow</button>
              </div>
            </div>
          );
        })}

        <p className="recommendations">
          View all recommendations
          <img src={images.arrow} alt="" />
        </p>
      </div>
      <div className="photo">
        <img src={images.banner} alt="" />
      </div>
    </div>
  );
};

export default RightHome;
