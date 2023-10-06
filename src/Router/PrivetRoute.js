import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const PrivetRoute = ({ user, children }) => {
  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    if (!user) {
      navigate("/SignUp", { replace: true });
      return;
    }
  }, [user]);

  return children;
};

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(PrivetRoute);
