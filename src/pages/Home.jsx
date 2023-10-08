import React, { useEffect, useState, useRef } from "react";
import {
  deletePostAPI,
  getPostsAPI,
  getUserAuth,
} from "../Redux/action/allFun";
import { connect } from "react-redux";
import LeftHome from "../components/LeftHome";
import RightHome from "../components/RightHome";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import ReactPlayer from "react-player";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Home = ({ user, posts, getUserAuth, loading, getPosts, deletePost }) => {
  const [isModal_Open, setIsModal_Open] = useState(false);

  useEffect(() => {
    getPosts();
    getUserAuth();
  }, []);

  const toggle_Modal = () => {
    setIsModal_Open(!isModal_Open);
  };

  const calculateTimesPassed = (date) => {
    const currentDate = new Date();
    const timeDifferenceInMilliseconds = currentDate - date;

    const daysPassed = Math.floor(
      timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24)
    );

    if (daysPassed === 0) {
      const hoursPassed = Math.floor(
        timeDifferenceInMilliseconds / (1000 * 60 * 60)
      );
      if (hoursPassed < 1) {
        const totalMinutesPassed = Math.floor(
          timeDifferenceInMilliseconds / (1000 * 60)
        );
        if (totalMinutesPassed == 0) {
          return "now";
        }
        return totalMinutesPassed + " min";
      } else {
        return hoursPassed + " h";
      }
    } else if (daysPassed < 3) {
      return daysPassed + " d";
    } else {
      return date.toLocaleDateString();
    }
  };

  // handle Alert and delete post
  const handleAlert = (user, post) => {
    confirmAlert({
      title: "Delete Post",
      message: "Are you sure you want to delete this post?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deletePost(user.email, post.author.User_Email, post.id);
          },
        },
        {
          label: "No",
          onClick: () => {
            // Handle "No" action here
          },
        },
      ],
    });
  };

  return (
    <>
      <CreatePost isModal_Open={isModal_Open} toggle_Modal={toggle_Modal} />
      <div>
        <Navbar />
        <div className="home">
          {/* left Side */}
          <LeftHome />
          {/* Posts */}
          <div className="mainHome">
            <div className="start_post">
              <div className="main_start">
                {user && user.photoURL ? (
                  <img src={user.photoURL} />
                ) : (
                  <img src="/src/assets/user.svg" alt="user" />
                )}
                <button onClick={toggle_Modal}>Start a post</button>
              </div>
              <div className="icons">
                <div onClick={toggle_Modal}>
                  <img src="/src/assets/photo-icon.svg" alt="" />
                  <p>Media</p>
                </div>
                <div onClick={toggle_Modal}>
                  <img src="/src/assets/event-icon.svg" alt="" />
                  <p>Event</p>
                </div>
                <div onClick={toggle_Modal}>
                  <img src="/src/assets/article-icon.svg" alt="" />
                  <p>Write posts</p>
                </div>
              </div>
            </div>
            {loading && (
              <div className="loading">
                <img src="/src/assets/loader.svg" alt="loading" />
              </div>
            )}
            {posts.length <= 0 ? (
              <p className="no_post">There are no posts.</p>
            ) : (
              posts.map((post, index) => (
                <div className="post" key={index}>
                  <div className="post_title">
                    {post.author.User_Image && post.author.User_Image ? (
                      <img src={post.author.User_Image} />
                    ) : (
                      <img src="/src/assets/user.svg" alt="user" />
                    )}
                    <div className="info_user">
                      <div className="name">
                        <h4>{post.author.User_Name}</h4>
                        <div className="imgs">
                          <img src="/src/assets/post-dots.svg" alt="3 dots" />
                          <img
                            onClick={() => handleAlert(user, post)}
                            src="/src/assets/post_cross.svg"
                            alt="delete"
                          />
                        </div>
                      </div>
                      <p>{post.author.User_Email}</p>

                      <div className="date">
                        <p>{calculateTimesPassed(post.PostDate.toDate())} </p>

                        <img src="/src/assets/dot.svg" alt="" />
                        <img src="/src/assets/world.svg" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="post_content">
                    <p className={post.TextType == "arabic" ? "arabic" : ""}>
                      {post.PostText}
                    </p>
                    {post.PostImage && !post.VideoLink ? (
                      <div className="center">
                        <img src={post.PostImage} alt="post image" />
                      </div>
                    ) : !post.PostImage && post.VideoLink ? (
                      <div className="center">
                        <ReactPlayer width="100%" url={post.VideoLink} />
                      </div>
                    ) : null}
                  </div>

                  <div className="post_react">
                    <div>
                      <img src="/src/assets/like.svg" alt="" />
                      <img src="/src/assets/heart.svg" alt="" />
                      {/* <p>Ahmed Allawi and {post.Likes} others</p> */}
                      <p>{post.Likes}</p>
                    </div>
                    <div>
                      <p> {post.Comments} comments </p>
                      <p> {post.Reposts} reposts </p>
                    </div>
                  </div>

                  <div className="line" />
                  <div className="icons">
                    <div>
                      <img src="/src/assets/like-icon.svg" alt="" />
                      <p>Like</p>
                    </div>
                    <div>
                      <img src="/src/assets/comment-icon.svg" alt="" />
                      <p>Comment</p>
                    </div>
                    <div>
                      <img src="/src/assets/share-icon.svg" alt="" />
                      <p>Repost</p>
                    </div>
                    <div>
                      <img src="/src/assets/send-icon.svg" alt="" />
                      <p>Send</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Right Side */}
          <RightHome />
        </div>
      </div>
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
    getUserAuth: () => dispatch(getUserAuth()),
    getPosts: () => dispatch(getPostsAPI()),
    deletePost: (userNow, userPublisher, postID) =>
      dispatch(deletePostAPI(userNow, userPublisher, postID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
