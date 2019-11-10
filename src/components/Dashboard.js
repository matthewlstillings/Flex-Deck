import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import ActiveWorkout from './ActiveWorkout';
import WorkoutContext from '../context/workout-context';
import RoutineList from './RoutineList';

export default () => {
    const {setIsActive, isActive, user, currentWorkout, setError, updateUser} = useContext(WorkoutContext);
    const startRoutine = () => {
        toggle();
    }
    const toggle = () => {
        setIsActive(!isActive);
    }
    const throwError = (e) => {
        e.preventDefault();
        setError('Please enter your name')
    }
    const handleNameSet = (e) => {
        let name = e.target.value
        updateUser({
            ...user,
            name
        })
        setTimeout(()=> {
            localStorage.setItem('user', JSON.stringify({
                ...user,
                name
            }))
        }, 1000)    }
    return (
        <div id="landing">
                {
                   isActive ? <ActiveWorkout /> : (
                       <div className="content">
                                {
                                    user.totalWorkouts > 0 ? (
                                        <div>
                                            <p className="dashboard_title page_title">Welcome back, <span>{user.name}</span></p>
                                            <div className="info_box info_box--small">
                                                <p className="info_box_title">You have completed: </p>
                                                <p className="stat">{user.totalReps} reps over {user.totalWorkouts} workouts!</p>
                                                <p className="stat">It took you {user.previousWorkout.time} to complete your most recent workout.</p>
                                            </div>
                                            <button className="start_button button--lrg button--mobile" disabled={!currentWorkout} onClick={startRoutine}>Start Workout</button> 
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="dashboard_title">Welcome to <span>Flex Deck</span></p>
                                            <div className="info_box info_box--small  info_box--intro">
                                                <p className="stat">Flex Deck is a deck of cards workout that will help you workout anytime, anywhere. Each card is a different exercise and a random number of reps. </p>
                                            </div>
                                            <div className="info_box info_box--small  info_box--intro">   
                                                <p>Please enter your name and set up your first routine below.</p>
                                                <input onChange={handleNameSet} type="text" placeholder="Your Name" value={!user.name ? '' : user.name}/>
                                            </div>
                                        </div>
                                    )
                                }
                                <div>
                                <p className="dashboard_section_title section_title">Selected Workout</p>
                                {
                                    currentWorkout ? (
                                        <div className="info_box info_box--medium info_box--workout">
                                            <RoutineList currentWorkout={currentWorkout}/>
                                        </div>
                                    ) : (
                                        <div className="info_box info_box--small">
                                            <p className="info_box_title">Please select a routine or create your own</p>
                                            <Link onClick={user.name == null && throwError} className="button button--info" to="/workouts"><p>Set workout</p></Link>
                                        </div>
                                    )
                                }
                                </div>
                            <button className="start_button button--lrg button--desktop" disabled={!currentWorkout} onClick={startRoutine}>Start Workout</button> 
                       </div>
                   )
                }
                
        </div>
    )
}