import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Timestamp } from "firebase/firestore";
import { addPostAPI } from "../Redux/action/allFun";
import { AudioRecorder } from "react-audio-voice-recorder";
import images from "../constants/images";
import ReactPlayer from "react-player";
import he from "he";

const CreatePost = ({ isModal_Open, toggle_Modal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);

  // Text
  const [text_Post, setText_Post] = useState("");
  const [text_Type, setText_Type] = useState("");

  // image
  const [image_Post, setImage_Post] = useState("");

  // Video
  const [inputVideo_Display, setInputVideo_Display] = useState(false);
  const [inputVideo_Value, setInputVideo_Value] = useState("");
  const [isValidURL, setIsValidURL] = useState(false);

  // Audio
  const [isRecording, setIsRecording] = useState(false);
  const [recordDone, setRecordDone] = useState(false);
  const [audioTest, setAudioTest] = useState();
  const [fileUrl, setFileUrl] = useState("");
  const audioRef = useRef(null);

  // handle iamge
  const handle_Input_Img_Change = (e) => {
    setInputVideo_Value("");
    setIsRecording(false);
    setRecordDone(false);
    setAudioTest("");
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not an image , the file is a ${typeof image}`);
      return;
    } else {
      setImage_Post(image);
    }
  };

  // handle video
  const handle_Input_Video_Change = (e) => {
    setImage_Post("");
    const text = e.target.value;
    setInputVideo_Value(text);
    try {
      const url = new URL(text);
      setIsValidURL(true);
    } catch (error) {
      setIsValidURL(false);
    }
  };

  // handle record
  const handle_record = (blob) => {
    setImage_Post("");
    let fileName = "name";
    const url = URL.createObjectURL(blob);
    setAudioTest(url);
    setRecordDone(true);
    const file = new File([blob], fileName, { type: blob.type });
    setFileUrl(file);
  };
  const Recordagain = () => {
    setAudioTest("");
    setRecordDone(false);
  };

  // reset all
  const reset_All = () => {
    setText_Post("");
    setImage_Post("");
    setInputVideo_Value("");
    setInputVideo_Display(false);
    setIsRecording(false);
    setRecordDone(false);
    setAudioTest("");
    setFileUrl("");
  };

  // handle close
  const handle_Close = () => {
    reset_All();
    toggle_Modal();
  };

  // create Post
  const create_Post = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    const Post = {
      User: user,
      Text: text_Post,
      TextType: text_Type,
      Image: image_Post,
      VideoLink: inputVideo_Value,
      Record: fileUrl,
      Date: Timestamp.now(),
    };
    console.log(Post);
    dispatch(addPostAPI(Post));
    handle_Close();
    setAudioTest("");
  };

  // handel text post
  const handleInputText = (e) => {
    setText_Post(e.target.value);

    const inputValue = e.target.value;
    const decodedText = he.decode(inputValue);

    const isArabic = /[\u0600-\u06FF]/.test(decodedText);
    const isEnglish = /^[A-Za-z0-9\s]+$/.test(decodedText);

    if (isArabic) {
      setText_Type("arabic");
    } else if (isEnglish) {
      setText_Type("english");
    }
  };

  return (
    <>
      {isModal_Open && (
        <div className="overlay">
          <div className="newPost">
            <div className="user">
              <div>
                <img src={user?.photoURL || images.userImg} alt="user image" />
                <h4>{user?.displayName || "User Name"}</h4>
              </div>
              <div onClick={handle_Close}>
                <img src={images.closeIcon} alt="close" />
              </div>
            </div>

            <div className="line" />

            <textarea
              placeholder="What do you want to talk about?"
              autoFocus={true}
              value={text_Post}
              onChange={(e) => handleInputText(e)}
            />

            <div className="img_video">
              {image_Post && (
                <img src={URL.createObjectURL(image_Post)} alt="imge post" />
              )}
              {inputVideo_Display && (
                <>
                  <input
                    type="text"
                    value={inputVideo_Value}
                    onChange={handle_Input_Video_Change}
                    placeholder="Enter a URL"
                  />
                  {inputVideo_Value && isValidURL && (
                    <ReactPlayer
                      url={inputVideo_Value}
                      width="100%"
                      height="300px"
                      style={{
                        padding: "10px 0",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                  {inputVideo_Value && !isValidURL && (
                    <p>This link is invalid</p>
                  )}
                </>
              )}
            </div>
            <div className="center">
              {isRecording &&
                (!recordDone ? (
                  <AudioRecorder
                    style={{ color: "green" }}
                    className="recordIcone"
                    onRecordingComplete={(blob) => handle_record(blob)}
                    audioTrackConstraints={{
                      noiseSuppression: true,
                      echoCancellation: true,
                    }}
                    downloadFileExtension="webm"
                  />
                ) : (
                  audioTest && (
                    <div className="audio_test">
                      <audio ref={audioRef} controls src={audioTest} />
                      <div className="audio_button">
                        <button
                          className="play"
                          onClick={() => audioRef.current.play()}
                        >
                          Play
                        </button>
                        <button
                          className="pause"
                          onClick={() => audioRef.current.pause()}
                        >
                          Pause
                        </button>
                        <button className="again" onClick={Recordagain}>
                          Recording again
                        </button>
                      </div>
                    </div>
                  )
                ))}
            </div>
            <div className="line" />

            <div className="buttons">
              <div>
                <button
                  className="image-upload"
                  onClick={() => setInputVideo_Display(false)}
                >
                  <label htmlFor="file-input">
                    <img src={images.shareImage} alt="share image" />
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    onChange={handle_Input_Img_Change}
                  />
                </button>
                <button
                  onClick={() => setInputVideo_Display(!inputVideo_Display)}
                >
                  <img src={images.shareVideo} alt="share video" />
                </button>
                <button onClick={() => setIsRecording(!isRecording)}>
                  <img src={images.shareRecord} alt="Record icon" />
                </button>
              </div>
              <button
                onClick={create_Post}
                disabled={
                  !text_Post && image_Post == "" && !isValidURL && fileUrl == ""
                }
                className="post"
              >
                post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
