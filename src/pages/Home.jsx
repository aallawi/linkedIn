import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import {
  getPostsAPI,
  getUserAuth,
  deletePostAPI,
} from "../Redux/action/allFun";
import LeftHome from "../components/LeftHome";
import RightHome from "../components/RightHome";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import ReactPlayer from "react-player";
import images from "../constants/images";
import { createPost, reactionsPost } from "../constants/data";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);
  const posts = useSelector((state) => state.postState.posts);
  const loading = useSelector((state) => state.postState.loading);

  const [isModal_Open, setIsModal_Open] = useState(false);

  useEffect(() => {
    dispatch(getUserAuth());
    dispatch(getPostsAPI());
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
            dispatch(
              deletePostAPI(user.email, post.author.User_Email, post.id)
            );
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

          {/* All Posts */}
          <div className="mainHome">
            <div className="start_post">
              <div className="main_start">
                <img src={user?.photoURL || images.userImg} alt="User image" />
                <button onClick={toggle_Modal}>Start a post</button>
              </div>
              <div className="icons">
                {createPost.map((item, index) => {
                  return (
                    <div key={index} onClick={toggle_Modal}>
                      <img src={item.img} alt={item.title} />
                      <p>{item.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            {loading && (
              <div className="loading">
                <img src={images.loading} alt="loading" />
              </div>
            )}
            {posts.length <= 0 ? (
              <p className="no_post">There are no posts.</p>
            ) : (
              posts.map((post, index) => (
                <div className="post" key={index}>
                  <div className="post_title">
                    <img
                      src={post?.author.User_Image || images.userImg}
                      alt="user Image"
                    />
                    <div className="info_user">
                      <div className="name">
                        <h4>{post.author.User_Name}</h4>
                        <div className="imgs">
                          <img src={images.dots} alt="dots" />
                          <img
                            onClick={() => handleAlert(user, post)}
                            src={images.cross}
                            alt="delete"
                          />
                        </div>
                      </div>
                      <p>{post.author.User_Email}</p>

                      <div className="date">
                        <p>{calculateTimesPassed(post.PostDate.toDate())} </p>

                        <img src={images.dot} alt="dot" />
                        <img src={images.world} alt="world" />
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
                      <img src={images.likeReacion} alt="like reaction" />
                      <img src={images.heartReacion} alt="heart reaction" />
                      <p>{post.Likes}</p>
                    </div>
                    <div>
                      <p> {post.Comments} comments </p>
                      <p> {post.Reposts} reposts </p>
                    </div>
                  </div>

                  <div className="line" />

                  <div className="icons">
                    {reactionsPost.map((item, index) => {
                      return (
                        <div key={index}>
                          <img src={item.img} alt={item.title} />
                          <p>{item.title}</p>
                        </div>
                      );
                    })}
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

export default Home;
