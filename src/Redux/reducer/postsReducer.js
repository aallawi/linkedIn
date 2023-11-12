import {
  SET_LOADING,
  GET_POSTS,
  GET_ONE_POST,
  GET_POSTS_BY_EMAIL,
  GET_COMMENTS,
} from "../action/actionTypes";

export const initialState = {
  loading: false,
  posts: [],
  AllComments: [],
  postsByEmail: [],
  onePost: [],
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

    case GET_ONE_POST:
      return {
        ...state,
        onePost: action.payload,
      };

    case GET_POSTS_BY_EMAIL:
      return {
        ...state,
        postsByEmail: action.payload,
      };

    case GET_COMMENTS:
      return {
        ...state,
        AllComments: action.payload,
      };

    default:
      return state;
  }
}

export default postsReducer;
