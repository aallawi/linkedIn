import { SET_USER } from "../action/actionTypes";

export const initialState = {
  user: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}

export default userReducer;
