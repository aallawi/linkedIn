import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuth } from "../Redux/action/allFun";
import images from "../constants/images";

const LeftHome = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);

  useEffect(() => {
    dispatch(getUserAuth());
  }, [user]);

  return (
    <div className="leftHome">
      <img src={images.cover} alt="account cover" />
      <div className="line">
        <img src={user?.photoURL || images.userImg} alt="user image" />
      </div>
      <div className="user">
        <h4>Welcome, {user?.displayName || "there!"}</h4>
        <p>{user ? user.email : ""}</p>
      </div>
      <div className="line" />
      <div className="info">
        <div>
          <p>Who's vieweded your profile</p>
          <span>{Math.floor(Math.random() * (1401 - 1200) + 1200)}</span>
          {/*Random number between 1200 => 1400 */}
        </div>
        <div>
          <p>Imperssion of your post</p>
          <span>{Math.floor(Math.random() * (901 - 700) + 700)}</span>
          {/*Random number between 700 => 900 */}
        </div>
      </div>
      <div className="line" />
      <div className="myItem">
        <img src={images.itemsIcon} alt="My Item" />
        <p>My items</p>
      </div>
    </div>
  );
};

export default LeftHome;
