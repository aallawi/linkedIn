import { useState, useRef, useEffect } from "react";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";

const Audio = ({ song }) => {
  const [percentage, setPercentage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef();

  const onChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;
    setPercentage(e.target.value);
  };

  const play = () => {
    const audio = audioRef.current;
    audio.volume = 0.1;

    if (!isPlaying) {
      setIsPlaying(true);
      audio.play();
    }

    if (isPlaying) {
      setIsPlaying(false);
      audio.pause();
    }
  };

  const getCurrDuration = (e) => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;

    setPercentage(+percent);
    setCurrentTime(time.toFixed(2));
  };

  // ============  slider
  const [position, setPosition] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);

  const rangeRef = useRef();
  const thumbRef = useRef();

  useEffect(() => {
    const rangeWidth = rangeRef.current.getBoundingClientRect().width;
    const thumbWidth = thumbRef.current.getBoundingClientRect().width;
    const centerThumb = (thumbWidth / 100) * percentage * -1;
    const centerProgressBar =
      thumbWidth +
      (rangeWidth / 100) * percentage -
      (thumbWidth / 100) * percentage;
    setPosition(percentage);
    setMarginLeft(centerThumb);
    setProgressBarWidth(centerProgressBar);
  }, [percentage]);

  // ============  control Panel
  const secondsToHms = (seconds) => {
    if (!seconds) return "0s";

    let duration = seconds;
    let hours = duration / 3600;
    duration = duration % 3600;

    let min = parseInt(duration / 60);
    duration = duration % 60;

    let sec = parseInt(duration);

    if (parseInt(hours, 10) > 0) {
      return `${parseInt(hours, 10)}h ${min}m ${sec}s`;
    } else if (min == 0) {
      return `${sec}s`;
    } else {
      return `${min}m ${sec}s`;
    }
  };

  return (
    <div className="audio">
      <div className="app-container">
        <div className="slider-container">
          <div
            className="progress-bar-cover"
            style={{
              width: `${progressBarWidth}px`,
            }}
          ></div>
          <div
            className="thumb"
            ref={thumbRef}
            style={{
              left: `${position}%`,
              marginLeft: `${marginLeft}px`,
            }}
          ></div>
          <input
            type="range"
            value={position}
            ref={rangeRef}
            step="0.01"
            className="range"
            onChange={onChange}
          />
        </div>
        <audio
          ref={audioRef}
          onTimeUpdate={getCurrDuration}
          onLoadedData={(e) => {
            setDuration(e.currentTarget.duration.toFixed(2));
          }}
          src={song}
        ></audio>
        <div className="control-panel">
          <div className="timer">{secondsToHms(currentTime)}</div>
          <div className="btn-container">
            {isPlaying ? (
              <AiFillPauseCircle onClick={play} />
            ) : (
              <AiFillPlayCircle onClick={play} />
            )}
          </div>
          <div className="timer">{secondsToHms(duration)}</div>
        </div>
      </div>
    </div>
  );
};

export default Audio;
