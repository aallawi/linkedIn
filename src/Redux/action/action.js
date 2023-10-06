import { SET_USER, SET_LOADING, GET_POSTS } from "./actionTypes";

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const setLoading = (status) => {
  return {
    type: SET_LOADING,
    payload: status,
  };
};

export const getPosts = (posts) => {
  return {
    type: GET_POSTS,
    payload: posts,
  };
};
