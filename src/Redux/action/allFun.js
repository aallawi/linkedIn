import { auth, provider, db, storage } from "../../../firebase";
import { setUser, setLoading, getPosts } from "./action";
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
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { v4 } from "uuid";

// sign in  [ Google ]
export function signInWithGoogleAPI() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
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
        // const userData = {
        //   uid: user.uid,
        //   email: user.email,
        //   name: user.displayName,
        //   image: user.photoURL,
        // };
        // console.log(userData);
        // localStorage.setItem("userData", JSON.stringify(userData));
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
        PostImage: Post.Image,
        VideoLink: Post.VideoLink,
        Likes: Math.floor(Math.random() * 100),
        Comments: Math.floor(Math.random() * 50),
        Reposts: Math.floor(Math.random() * 20),
      });
      dispatch(setLoading(false));
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
        PostImage: Post.Image,
        VideoLink: Post.VideoLink,
        Likes: Math.floor(Math.random() * 100),
        Comments: Math.floor(Math.random() * 50),
        Reposts: Math.floor(Math.random() * 20),
      });
      dispatch(setLoading(false));
    }
  };
}

// delete Post
export function deletePostAPI(userNow, userPublisher, postID) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    // console.log("userNow", userNow);
    // console.log("userPublisher", userPublisher);
    // console.log("postID", postID);

    if (userNow === userPublisher) {
      const docRef = doc(db, "Posts", postID);
      deleteDoc(docRef)
        .then(() => {
          console.log("post Deleted Successfully.");
        })
        .catch((error) => {
          console.error(`Deleting Post Failed : ${error}`);
        });
    } else {
      alert("مينفعش تحذف بوست مش بتاعك يا صاحبي");
    }

    dispatch(setLoading(false));
  };
}
