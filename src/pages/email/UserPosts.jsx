import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePostAPI, getPostsByEmailAPI } from "../../Redux/action/allFun";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsBell } from "react-icons/bs";
import { reactionsPost } from "../../constants/data";
import { confirmAlert } from "react-confirm-alert";
import Navbar from "../../components/Navbar";
import images from "../../constants/images";
import RightHome from "../../components/RightHome";
import ReactPlayer from "react-player";

const UserPosts = () => {
  const { emailID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);
  const postsByEmail = useSelector((state) => state.postState.postsByEmail);
  const loading = useSelector((state) => state.postState.loading);

  // const { author } = postsByEmail[0];
  // console.log(author);

  console.log(postsByEmail[0]?.author.User_Name);
  console.log(postsByEmail[0]?.author.User_Image);

  useEffect(() => {
    dispatch(getPostsByEmailAPI(emailID));
  }, []);

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
      <Navbar />
      <div className="grid_det">
        <div className="leftgrid user_posts">
          {loading && (
            <div className="loading">
              <img src={images.loading} alt="loading" />
            </div>
          )}
          <div className="user_details">
            <img className="cover" src={images.cover} alt="account cover" />
            <div className="photo">
              <img
                src={postsByEmail[0]?.author.User_Image || images.userImg}
                alt="user image"
              />
            </div>
            <p>
              <span>
                <BsBell />
              </span>
            </p>

            <div className="name">
              <h2>{postsByEmail[0]?.author.User_Name}</h2>
              <h6>Software Engineer</h6>
              <div>
                <span className="address">Cairo, Egypt </span>
                <span className="Contact_info">Contact info</span>
              </div>
              <p className="Contact_info">
                {Math.floor(Math.random() * (151 - 50) + 50)} connections
              </p>
              <div className="mutual">
                <img src={images.userConect} alt="user" />
                <span> Mohammed Abd-allah, </span>
                and {Math.floor(Math.random() * (80 - 5) + 5)} other mutual
                connections
              </div>
              <div className="button">
                <button className="message">
                  <RiSendPlaneFill /> Message
                </button>
                <button className="more">More</button>
              </div>
            </div>
          </div>
          {postsByEmail.map((post, index) => (
            <div className="post" key={index}>
              <div className="post_title">
                <img
                  onClick={() => navigate(`/email/${post.author.User_Email}`)}
                  src={post.author.User_Image || images.userImg}
                  alt="user Image"
                />
                <div className="info_user">
                  <div className="name">
                    <h4
                      onClick={() =>
                        navigate(`/email/${post.author.User_Email}`)
                      }
                    >
                      {post.author.User_Name}
                    </h4>
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
              <div
                className="post_content"
                onClick={() => navigate(`/post/${post.id}`)}
              >
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
                    <div
                      key={index}
                      onClick={() => navigate(`/post/${post.id}`)}
                    >
                      <img src={item.img} alt={item.title} />
                      <p>{item.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="rightgrid">
          <RightHome />
        </div>
      </div>
    </>
  );
};

export default UserPosts;
