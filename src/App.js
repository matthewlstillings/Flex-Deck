import React, { useState } from "react";
import WorkoutContext from "./context/workout-context";
import AppRouter from "./routers/AppRouter";

const userData = JSON.parse(localStorage.getItem("user"));

function App() {
  const [currentWorkout, setCurrentWorkout] = useState();
  const [isActive, setIsActive] = useState(false);
  const [user, updateUser] = useState(
    !userData
      ? {
          totalWorkouts: 0,
          totalReps: 0,
          name: null,
          previousWorkout: {
            time: "",
            routine: []
          }
        }
      : userData
  );
  const [error, setError] = useState("");
  const closeError = () => {
    setError("");
  };
  return (
    <>
      <WorkoutContext.Provider
        value={{
          setError,
          error,
          currentWorkout,
          setCurrentWorkout,
          setIsActive,
          user,
          updateUser,
          isActive
        }}
      >
        <AppRouter />
      </WorkoutContext.Provider>
      {error.length > 0 && (
        <div className="error_box">
          <div>
            <p>{error}</p>
            <p className="close" onClick={closeError}>
              X
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
