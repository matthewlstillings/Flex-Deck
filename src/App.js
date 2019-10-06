import React, {useState, useReducer, useEffect} from 'react';
import {fullbody} from './data/workouts';
import './App.css';
import WorkoutContext from './context/workout-context';
import AppRouter from './routers/AppRouter';
import userReducer from './reducers/user';

const userData = JSON.parse(localStorage.getItem('user'));

function App() {
  const [currentWorkout, setCurrentWorkout] = useState();
  const [visited, setVisited] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [user, updateUser] = useReducer(userReducer, !userData ? {
        totalWorkouts: 0,
        totalReps: 0
  } : userData)
  const [error, setError] = useState('');
  return (
    <>
    <WorkoutContext.Provider value={{setError, error, currentWorkout, setCurrentWorkout, setIsActive, user, isActive}}>
      <AppRouter />
    </WorkoutContext.Provider>
    {
                    error.length > 0 && <div className="error_box"><div><p>{error}</p></div></div>
    }
    </>
  );
}

export default App;
