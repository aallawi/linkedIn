import { useDispatch, useSelector } from "react-redux";
import { sinOutAPI } from "../Redux/action/allFun";
import { AiFillMessage } from "react-icons/ai";
import { navs } from "../constants/data";
import images from "../constants/images";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);

  return (
    <nav>
      <div className="nav_logo">
        <img src={images.homeLogo} alt="logo linkedin" />
        <div className="nav_logo_input">
          <img className="icon" src={images.searchIcon} alt="search icon" />
          <input type="text" placeholder="Seach" />
        </div>
        <div className="nav_logo_message">
          <AiFillMessage />
        </div>
      </div>

      <ul className="nav_links">
        {navs.map((item, index) => {
          return (
            <li key={index} className="nav_link">
              <img src={item.img} alt={item.title} />
              <span>{item.title}</span>
            </li>
          );
        })}

        <li className="nav_link">
          <div className="dropdown">
            {user?.photoURL ? (
              <img src={user?.photoURL} alt="user image" />
            ) : (
              <img src={images.userImg} alt="user image" />
            )}

            <span>
              Me
              <img src={images.downIcon} alt="" />
            </span>
            <div
              className="dropdown-content"
              onClick={() => dispatch(sinOutAPI())}
            >
              <a>Sign Out</a>
            </div>
          </div>
        </li>

        <li className="nav_link">
          <img src={images.navWork} alt="" />
          <span>
            Work
            <img src={images.downIcon} alt="" />
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
