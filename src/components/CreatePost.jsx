import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Timestamp } from "firebase/firestore";
import { addPostAPI } from "../Redux/action/allFun";
import ReactPlayer from "react-player";

const CreatePost = ({ isModal_Open, toggle_Modal, user, addPost }) => {
  // Text
  const [text_Post, setText_Post] = useState("");

  // image
  const [image_Post, setImage_Post] = useState("");

  // Video
  const [inputVideo_Display, setInputVideo_Display] = useState(false);
  const [inputVideo_Value, setInputVideo_Value] = useState("");
  const [isValidURL, setIsValidURL] = useState(false);

  // handle iamge
  const handle_Input_Img_Change = (e) => {
    setInputVideo_Value("");
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not an image , the file is a ${typeof image}`);
      return;
    } else {
      setImage_Post(image);
    }
  };

  // handle video
  const handle_Input_Video_Change = (e) => {
    setImage_Post("");
    const text = e.target.value;
    setInputVideo_Value(text);
    try {
      const url = new URL(text);
      setIsValidURL(true);
    } catch (error) {
      setIsValidURL(false);
    }
  };

  // reset all
  const reset_All = () => {
    setText_Post("");
    setImage_Post("");
    setInputVideo_Value("");
  };

  // handle close
  const handle_Close = () => {
    reset_All();
    toggle_Modal();
  };

  // create Post
  const create_Post = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    const Post = {
      User: user,
      Text: text_Post,
      Image: image_Post,
      VideoLink: inputVideo_Value,
      Date: Timestamp.now(),
    };
    addPost(Post);
    console.log(Post);
    handle_Close();
  };

  return (
    <>
      {isModal_Open && (
        <div className="overlay">
          <div className="newPost">
            <div className="user">
              <div>
                {user && user.photoURL ? (
                  <img src={user.photoURL} />
                ) : (
                  <img src="/src/assets/user.svg" alt="user" />
                )}

                {<h4>{user ? user.displayName : "User Name"}</h4>}
              </div>
              <div onClick={handle_Close}>
                <img src="/src/assets/close-icon.svg" alt="" />
              </div>
            </div>

            <div className="line" />

            <textarea
              placeholder="What do you want to talk about?"
              autoFocus={true}
              value={text_Post}
              onChange={(e) => setText_Post(e.target.value)}
            />

            <div className="img_video">
              {image_Post && (
                <img src={URL.createObjectURL(image_Post)} alt="img" />
              )}
              {inputVideo_Display && (
                <>
                  <input
                    type="text"
                    value={inputVideo_Value}
                    onChange={handle_Input_Video_Change}
                    placeholder="Enter a URL"
                  />
                  {inputVideo_Value && isValidURL && (
                    <ReactPlayer
                      url={inputVideo_Value}
                      width="100%"
                      height="300px"
                      style={{
                        padding: "10px 0",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                  {inputVideo_Value && !isValidURL && (
                    <p>This link is invalid</p>
                  )}
                </>
              )}
            </div>

            <div className="line" />

            <div className="buttons">
              <div>
                <button
                  className="image-upload"
                  onClick={() => setInputVideo_Display(false)}
                >
                  <label htmlFor="file-input">
                    <img src="/src/assets/share-image.svg" alt="" />
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    onChange={handle_Input_Img_Change}
                  />
                </button>
                <button onClick={() => setInputVideo_Display(true)}>
                  <img src="/src/assets/share-video.svg" alt="" />
                </button>
                <button>
                  <img src="/src/assets/comment-icon.svg" alt="" />
                </button>
              </div>
              <button
                onClick={create_Post}
                disabled={!text_Post}
                className="post"
              >
                post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,

    posts: state.postState.posts,
    loading: state.postState.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (Post) => dispatch(addPostAPI(Post)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
