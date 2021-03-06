import React from "react";

export default props => {
  return (
    <div className="workout_preview">
      {props.currentWorkout.map(exercise => {
        return (
          <div
            key={() => {
              Math.floor(Math.random() * Math.floor(5000));
            }}
            className="preview_exercise"
          >
            <img src={`../images/${exercise.suit}.svg`} alt={exercise.suit} />

            <p>{exercise.name}</p>
            <p>{exercise.muscles}</p>

            <p>Sets: {exercise.sets}</p>
          </div>
        );
      })}
    </div>
  );
};
