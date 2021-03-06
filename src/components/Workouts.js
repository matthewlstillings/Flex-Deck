import React, {useContext, useState} from 'react';
import WorkoutContext from '../context/workout-context';
import {workout} from '../data/workouts';
import RoutineList from './RoutineList';
import { withRouter } from "react-router-dom";

const Workouts = (props) => {
    const {setCurrentWorkout, setError, error} = useContext(WorkoutContext);
    const [preMadeWorkout, setPreMadeWorkout] = useState([]);
    const [customWorkout, setCustomWorkout] = useState([]);
    const [exercise, setCustomExercise] = useState({
        name: '',
        muscles: '',
        suit: '',
        sets: ''
    });
    const changeWorkout = (event) => {
        const routinesList = workout;
        const routine = event.target.value;
        setPreMadeWorkout(routinesList[routine]);
    }
    const setSets = (e) => {
        let sets = parseInt(e.target.value);
        setCustomExercise({...exercise, sets});
    }
    const setName = (e) => {
        let name = e.target.value;
        setCustomExercise({...exercise, name});
    }
    const setGroup = (e) => {
        let muscles = e.target.value;
        setCustomExercise({...exercise, muscles});
    }
    const setSuit = (e) => {
        let suit = e.target.value;
        setCustomExercise({...exercise, suit});
    }
    const pushExercise = (e) => {
        e.preventDefault();
        if (!exercise.name) {
            
            setError('Please fill all fields')
            console.log(error);
        } else {
            setCustomWorkout(customWorkout=>[
                ...customWorkout,
                {...exercise, completed: 0, reps: 0}   
            ])
            setCustomExercise({
                name: '',
                muscles: '',
                suit: '',
                sets: ''
            })
        }
        
        
    }
    const changeToCustomRoutine = () => {
        customWorkout.length > 0 ? setCurrentWorkout(customWorkout) : setError(true)
        props.history.push("/");
        
    }
    const changeToPreMadeRoutine = () => {
        preMadeWorkout.length > 0 ? setCurrentWorkout(preMadeWorkout) : setError(true)
        props.history.push("/");
    }
    return (
        <div id="workout">
            <p className="page_title">Set your <span>Flex Deck</span> Routine</p>
            <div className="content">
                <div>
                    <p className="section_title">Choose one of the premade routines</p>
                    <select className="workout_premade" onChange={changeWorkout}>
                        <option value="">Choose</option>
                        <option value="fullbody">Full Body</option>
                        <option value="arms">Arms & Shoulders</option>
                        <option value="chest">Chest & Back</option>
                        <option value="legs">Legs</option>
                        <option value="core">Core</option>
                    </select>
                    {preMadeWorkout.length > 0 && <button class="btn--premade" onClick={changeToPreMadeRoutine}>Set Routine</button>}
                </div>
                <div class="workout_custom_container">
                    <p className="section_title">Build your own!</p>
                    <p className="subtitle">Add exercises below. </p>
                    <RoutineList currentWorkout={customWorkout}/>
                    <form class="workout_custom-form info_box" onSubmit={pushExercise}>
                        <input type="text" value={exercise.name} placeholder="Exercise" onChange={setName}/>
                        <input type="number" value={exercise.sets} name="sets" onChange={setSets} placeholder="Number of Sets" />
                        <select value={exercise.muscles} name="group" onChange={setGroup}>
                            <option value="">Muscle Group</option>
                            <option value="arms">Arms</option>
                            <option value="back">Back</option>
                            <option value="chest">Chest</option>
                            <option value="core">Core</option>
                            <option value="legs">Legs</option>
                            <option value="shoulders">Shoulders</option>
                        </select>
                        <select value={exercise.suit} name="suit" onChange={setSuit}>
                            <option value="">Suit</option>
                            <option value="clubs">Clubs</option>
                            <option value="diamonds">Diamonds</option>
                            <option value="hearts">Hearts</option>
                            <option value="spades">Spades</option>
                        </select>
                        <button type="submit">Add</button>
                    </form>
                    {customWorkout.length > 0 && <button onClick={changeToCustomRoutine}>Finish Custom Routine</button>}
                </div>
                
                {
                //<button onClick={()=>{console.log(customWorkout, preMadeWorkout)}}>CLICK</button>
                }
            </div>
        </div>
    )
}

export default withRouter(Workouts);