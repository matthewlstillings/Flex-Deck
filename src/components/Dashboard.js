import React, {useState, useReducer, useContext} from 'react';
import {Link} from 'react-router-dom';
import ActiveWorkout from './ActiveWorkout';
import WorkoutContext from '../context/workout-context';
import RoutineList from './RoutineList';

const userData = JSON.parse(localStorage.getItem('user'));

export default () => {
    const {error, setIsActive, isActive, user, setCurrentWorkout, currentWorkout} = useContext(WorkoutContext);
    const [activeWorkout, setActiveWorkout] = useState([])
    const startRoutine = () => {
        setRoutine();
        toggle();
    }
    const toggle = () => {
        setIsActive(!isActive);
    }
    const setRoutine = () => {
        const routine = currentWorkout.map((exercise) => {
            return {
                ...exercise,
                reps: Math.floor(Math.random() * 15) + 5
            };
        });
        setActiveWorkout(routine);
    };
    const check = () => {
        console.log(currentWorkout);
    }
    return (
        <div id="landing">
                {
                   isActive ? <ActiveWorkout activeWorkout={activeWorkout} /> : (
                       <div class="content">
                                {
                                    user.totalWorkouts > 0 ? (
                                        <>
                                            <p className="dashboard_title page_title">Welcome back, <span>Matthew</span></p>
                                            <div className="info_box info_box--small">
                                                <p className="info_box_title">You have completed: </p>
                                                <p className="stat">{user.totalReps} reps </p>
                                                <p className="stat">{user.totalWorkouts} workouts</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <p className="dashboard_title">Welcome to <span>Flex Deck</span></p>
                                            <div className="info_box info_box--small  info_box--intro">
                                                <p class="stat">Flex Deck is a deck of cards workout that will help you workout anytime, anywhere. Each card is a different exercise and a random number of reps. </p>
                                                <p>Try your first routine below.</p>
                                            </div>
                                        </>
                                    )
                                }
                                
                                <p class="dashboard_section_title section_title">Selected Workout</p>
                                {
                                    currentWorkout ? (
                                        <div className="info_box info_box--small">
                                            <RoutineList currentWorkout={currentWorkout}/>
                                        </div>
                                    ) : (
                                        <div className="info_box info_box--small">
                                            <p className="info_box_title">Please select a routine or create your own</p>
                                            <Link className="button" to="/workouts"><p>Set workout</p></Link>
                                        </div>
                                    )
                                }
                            <button className="start_button" disabled={!currentWorkout} onClick={startRoutine}>Start Workout</button> 
                       </div>
                   )
                }
                
        </div>
    )
}