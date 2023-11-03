import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentAPI,
  deletePostAPI,
  getOnePostAPI,
  getUserAuth,
} from "../../Redux/action/allFun";
import { Timestamp } from "firebase/firestore";
import { confirmAlert } from "react-confirm-alert";
import Navbar from "../../components/Navbar";
import ReactPlayer from "react-player";
import images from "../../constants/images";
import Audio from "../../components/Audio";

const PostDetails = () => {
  const { PostID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [commentInput, setCommentInput] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const addComment = (name, image) => {
    const comment = {
      comment_User_Name: name,
      comment_User_Image: image,
      comment_Text: commentValue,
      comment_Date: Timestamp.now(),
    };
    dispatch(addCommentAPI(PostID, comment));
  };

  useEffect(() => {
    dispatch(getUserAuth());
    dispatch(getOnePostAPI(PostID));
  }, []);

  const user = useSelector((state) => state.userState.user);
  const loading = useSelector((state) => state.postState.loading);
  const postSelect = useSelector((state) => state.postState.onePost);

  const {
    // author: { User_Name, User_Email, User_Image },
    author,
    PostDate,
    PostText,
    TextType,
    PostImage,
    VideoLink,
    Record,
    Likes,
    Comments,
    Reposts,
    AllComments,
  } = postSelect;

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

  // setTimeout(() => {
  //   console.log(PostDate);
  //   console.log(PostDate.toDate().toLocaleDateString());
  //   console.log(calculateTimesPassed(PostDate.toDate()));
  // }, 1000);

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
      <Navbar />

      <div className="user_posts details">
        <div className="main_uset_posts">
          <div className="post">
            <div className="post_title">
              <img
                onClick={() => navigate(`/email/${author.User_Email}`)}
                src={author?.User_Image || images.userImg}
                alt="user Image"
              />

              <div className="info_user">
                <div className="name">
                  <h4 onClick={() => navigate(`/email/${author.User_Email}`)}>
                    {author?.User_Name}
                  </h4>
                  <div className="imgs">
                    <img src={images.dots} alt="dots" />
                    <img
                      onClick={() => handleAlert(user, postSelect)}
                      src={images.cross}
                      alt="delete"
                    />
                  </div>
                </div>
                <p>{author?.User_Email}</p>

                <div className="date">
                  {/* <p>{calculateTimesPassed(PostDate?.toDate())} </p> */}
                  <p>{PostDate?.toDate().toLocaleDateString()} </p>
                  <img src={images.dot} alt="dot" />
                  <img src={images.world} alt="world" />
                </div>
              </div>
            </div>

            <div className="post_content">
              <p className={TextType == "arabic" ? "arabic" : ""}>{PostText}</p>

              {Record && (
                <div className="audio">
                  <Audio song={Record} />
                </div>
              )}

              {PostImage && !VideoLink ? (
                <div className="center">
                  <img src={PostImage} alt="post image" />
                </div>
              ) : !PostImage && VideoLink ? (
                <div className="center">
                  <ReactPlayer width="100%" url={VideoLink} />
                </div>
              ) : null}
            </div>

            <div className="post_react">
              <div>
                <img src={images.likeReacion} alt="like reaction" />
                <img src={images.heartReacion} alt="heart reaction" />
                <p>{Likes}</p>
              </div>
              <div>
                <p> {Comments} comments </p>
                <p> {Reposts} reposts </p>
              </div>
            </div>

            <div className="line" />

            <div className="icons">
              <div>
                <img src={images.like} alt="Like" />
                <p>Like</p>
              </div>
              <div onClick={() => setCommentInput(!commentInput)}>
                <img src={images.comment} alt="Comment" />
                <p>Comment</p>
              </div>
              <div>
                <img src={images.repost} alt="Repost" />
                <p>Repost</p>
              </div>
              <div>
                <img src={images.send} alt="Send" />
                <p>Send</p>
              </div>
            </div>
            <div className="comments">
              {commentInput && (
                <div className="comment">
                  <img
                    src={author?.User_Image || images.userImg}
                    alt="user Image"
                  />
                  <input
                    type="text"
                    value={commentValue}
                    onChange={(e) => setCommentValue(e.target.value)}
                    placeholder="Add a comment.."
                  />
                  {commentValue !== "" && (
                    <button
                      onClick={() =>
                        addComment(author?.User_Name, author?.User_Image)
                      }
                    >
                      post
                    </button>
                  )}
                </div>
              )}
              {AllComments?.map((com, index) => {
                return (
                  <div key={index} className="comment">
                    <img
                      src={com.comment_User_Image || images.userImg}
                      alt="user Image"
                    />
                    <div>
                      <h4>{com.comment_User_Name}</h4>
                      <p>{com.comment_Text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetails;
