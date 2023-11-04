import {
  SET_USER,
  SET_LOADING,
  GET_POSTS,
  GET_ONE_POST,
  GET_POSTS_BY_EMAIL,
  SET_USER_TRUE_FALSE,
} from "./actionTypes";

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const userTrueOrFalse = (boolean) => {
  return {
    type: SET_USER_TRUE_FALSE,
    payload: boolean,
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

export const getPostsByEmail = (posts) => {
  return {
    type: GET_POSTS_BY_EMAIL,
    payload: posts,
  };
};

export const getOnePost = (post) => {
  return {
    type: GET_ONE_POST,
    payload: post,
  };
};
