import { SET_USER, SET_USER_TRUE_FALSE } from "../action/actionTypes";

export const initialState = {
  user: null,
  userTrueOrFalse: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SET_USER_TRUE_FALSE:
      return {
        ...state,
        userTrueOrFalse: action.payload,
      };

    default:
      return state;
  }
}

export default userReducer;
