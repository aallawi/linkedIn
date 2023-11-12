import { auth, provider, db, storage } from "../../../firebase";
import {
  setUser,
  setLoading,
  getPosts,
  getComments,
  getOnePost,
  getPostsByEmail,
  userTrueOrFalse,
} from "./action";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc,
  FieldValue,
} from "firebase/firestore";
import { v4 } from "uuid";
import { toast } from "react-toastify";

// sign in  [ Google ]
export function signInWithGoogleAPI() {
  return (dispatch) => {
    dispatch(userTrueOrFalse(true));
    signInWithPopup(auth, provider)
      .then((userInfo) => {
        const user = userInfo.user;
        dispatch(setUser(user));
      })
      .catch((error) => {
        dispatch(userTrueOrFalse(false));
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
}

// sign in [ Email and Password ]
export function signInWithEmailAndPassAPI(name, email, password) {
  console.log("name", name);
  console.log("email", email);
  console.log("password", password);

  return (dispatch) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return updateProfile(userCredential.user, {
          displayName: name,
        });
      })
      .then((userInfo) => {
        const user = userInfo.user;
        console.log("user", user);
        dispatch(setUser(user));
        console.log("Signed in successfully:", user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
}

// Login [ Email and Password ]
export function logInWithEmailAndPassAPI(email, password) {
  return (dispatch) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userInfo) => {
        const user = userInfo.user;
        dispatch(setUser(user));
        console.log("Signed in successfully:", user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
}

// check user
export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user));
        dispatch(userTrueOrFalse(true));
      }
    });
  };
}

// sign Out
export function sinOutAPI() {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(setUser(null));
        dispatch(userTrueOrFalse(false));
      })
      .catch((error) => {
        alert(error.message);
      });
  };
}

// Show All Posts
export function getPostsAPI() {
  return (dispatch) => {
    dispatch(setLoading(true));
    let all_Posts;
    const collRef = collection(db, "Posts");
    const orderedRef = query(collRef, orderBy("PostDate", "desc"));
    onSnapshot(orderedRef, (snapshot) => {
      all_Posts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(getPosts(all_Posts));
      dispatch(setLoading(false));
    });
  };
}

// Show Posts By Email
export function getPostsByEmailAPI(email) {
  return (dispatch) => {
    dispatch(setLoading(true));
    let all_Posts;
    const collRef = collection(db, "Posts");
    const orderedRef = query(collRef, orderBy("PostDate", "desc"));
    onSnapshot(orderedRef, (snapshot) => {
      all_Posts = snapshot.docs
        .filter((doc) => doc.data().author.User_Email == email)
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
      dispatch(getPostsByEmail(all_Posts));
      dispatch(setLoading(false));
    });
  };
}

// Show One Post
export function getOnePostAPI(postID) {
  return (dispatch) => {
    dispatch(setLoading(true));
    let one_Post;
    const collRef = collection(db, "Posts");
    const orderedRef = query(collRef);
    onSnapshot(orderedRef, (snapshot) => {
      one_Post = snapshot.docs.find((doc) => doc.id === postID);
      console.log(one_Post.data());
      dispatch(getOnePost(one_Post.data()));
      dispatch(setLoading(false));
    });
  };
}

// add Post
export function addPostAPI(Post) {
  return (dispatch) => {
    dispatch(setLoading(true));
    if (Post.Image) {
      const storageRef = ref(storage, `Images/${Post.Image.name + v4()}`);
      const uploadRef = uploadBytesResumable(storageRef, Post.Image);
      uploadRef.on(
        "state_changed",
        (snapshot) => {
          const progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% Done");
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadRef.snapshot.ref).then((downloadURl) => {
            const collRef = collection(db, "Posts");
            addDoc(collRef, {
              author: {
                User_Name: Post.User.displayName,
                User_Email: Post.User.email,
                User_Image: Post.User.photoURL,
              },
              PostDate: Post.Date,
              PostText: Post.Text,
              TextType: Post.TextType,
              PostImage: downloadURl,
              VideoLink: Post.VideoLink,
              Likes: Math.floor(Math.random() * 100),
              Comments: Math.floor(Math.random() * 50),
              Reposts: Math.floor(Math.random() * 20),
            });
          });
          dispatch(setLoading(false));
        }
      );
    } else if (Post.VideoLink) {
      const collRef = collection(db, "Posts");
      addDoc(collRef, {
        author: {
          User_Name: Post.User.displayName,
          User_Email: Post.User.email,
          User_Image: Post.User.photoURL,
        },
        PostDate: Post.Date,
        PostText: Post.Text,
        TextType: Post.TextType,
        PostImage: Post.Image,
        VideoLink: Post.VideoLink,
        Record: Post.Record,
        Likes: Math.floor(Math.random() * 100),
        Comments: Math.floor(Math.random() * 50),
        Reposts: Math.floor(Math.random() * 20),
      });
      dispatch(setLoading(false));
    } else if (Post.Record) {
      const storageRef = ref(storage, `Audio/${v4()}`);
      const uploadRef = uploadBytesResumable(storageRef, Post.Record);
      uploadRef.on(
        "state_changed",
        (snapshot) => {
          const progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% Done");
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadRef.snapshot.ref).then((downloadURl) => {
            const collRef = collection(db, "Posts");
            addDoc(collRef, {
              author: {
                User_Name: Post.User.displayName,
                User_Email: Post.User.email,
                User_Image: Post.User.photoURL,
              },
              PostDate: Post.Date,
              PostText: Post.Text,
              TextType: Post.TextType,
              PostImage: Post.Image,
              VideoLink: Post.VideoLink,
              Record: downloadURl,
              Likes: Math.floor(Math.random() * 100),
              Comments: Math.floor(Math.random() * 50),
              Reposts: Math.floor(Math.random() * 20),
            });
          });
          dispatch(setLoading(false));
        }
      );
    } else {
      const collRef = collection(db, "Posts");
      addDoc(collRef, {
        author: {
          User_Name: Post.User.displayName,
          User_Email: Post.User.email,
          User_Image: Post.User.photoURL,
        },
        PostDate: Post.Date,
        PostText: Post.Text,
        TextType: Post.TextType,
        PostImage: Post.Image,
        VideoLink: Post.VideoLink,
        Record: Post.Record,
        Likes: Math.floor(Math.random() * 100),
        Comments: Math.floor(Math.random() * 50),
        Reposts: Math.floor(Math.random() * 20),
      });
      dispatch(setLoading(false));
    }
  };
}

// add Comment
export function addCommentAPI(PostID, newComment) {
  console.log("PostID", PostID);
  console.log("newComment", newComment);
  return (dispatch) => {
    const postRef = collection(db, "Posts", PostID, "AllComments");
    addDoc(postRef, newComment)
      .then(() => {
        console.log("Comment added");
      })
      .catch((error) => {
        console.error("Error adding comment: ", error);
      });
  };
}

// All Comments
export function getCommentsAPI(PostID) {
  return (dispatch) => {
    dispatch(setLoading(true));
    let all_Comments;
    const collRef = collection(db, "Posts", PostID, "AllComments");
    const orderedRef = query(collRef, orderBy("comment_Date", "desc"));
    onSnapshot(orderedRef, (snapshot) => {
      all_Comments = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(all_Comments);
      dispatch(getComments(all_Comments));
      dispatch(setLoading(false));
    });
  };
}

// delete Post
export function deletePostAPI(userNow, userPublisher, postID) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    if (userNow === userPublisher) {
      const docRef = doc(db, "Posts", postID);
      deleteDoc(docRef)
        .then(() => {
          toast.success("Delete Post Successful.", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((error) => {
          toast.error(`Deleting Post Failed - ${error}`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
    } else {
      toast.error("Sorry, You can only delete your posts.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    dispatch(setLoading(false));
  };
}
