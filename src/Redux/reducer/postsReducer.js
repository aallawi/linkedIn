import { SET_LOADING, GET_POSTS } from "../action/actionTypes";

export const initialState = {
  loading: false,
  posts: [],
};

function postsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    default:
      return state;
  }
}

export default postsReducer;
