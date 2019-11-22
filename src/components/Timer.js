import React, { useState, useEffect, useContext } from "react";
import WorkoutContext from "../context/workout-context";

export default props => {
  const { isActive } = useContext(WorkoutContext);
  const [seconds, setSeconds] = useState(0);
  const [mSeconds, setMSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (mSeconds >= 9) {
          setSeconds(seconds => seconds + 1);
          setMSeconds(0);
        }
        if (seconds >= 60) {
          setSeconds(0);
          setMinutes(minutes => minutes + 1);
        }
        setMSeconds(mSeconds => mSeconds + 1);
        let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
        let formattedMS = "0" + mSeconds;
        props.setUserData({
          ...props.userData,
          previousWorkout: {
            ...props.userData.previousWorkout,
            time: `${formattedMinutes}:${formattedSeconds}:${formattedMS}`
          }
        });
      }, 100);
    } else if (!isActive && mSeconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, mSeconds]);
  return (
    <div class="timer">
      <p>
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}:0{mSeconds}
      </p>
    </div>
  );
};
