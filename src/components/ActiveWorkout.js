import React, {useContext, useState} from 'react';
import WorkoutContext from '../context/workout-context';
import Card from './Card';
import Timer from './Timer';

export default (props) => {
    const {setIsActive, user, setError} = useContext(WorkoutContext);
    const [activeWorkout, setActiveWorkout] = useState(props.activeWorkout ? props.activeWorkout : 'Please choose a routine');
    const [count, setCount] = useState(props.activeWorkout ? (Math.floor(Math.random() *  activeWorkout.length)) : null);
    const [userData, setUserData] = useState({
        totalWorkouts: user.totalWorkouts + 1,
        totalReps: user.totalReps + activeWorkout.map((exercise)=>exercise.reps).reduce((a, b)=>a + b, 0),
        previousWorkout: {
            routine: activeWorkout,
            time: ''
        }
    });
    const completeWorkout = () => {
        setIsActive(false);
        setTimeout(()=> {
            localStorage.setItem('user', JSON.stringify(userData))
        },1000)
        console.log(userData);
    }
    const nextCard = () => {  
       const workoutCopy = activeWorkout.slice();
       const isFinished = workoutCopy.map(exercise=> exercise.isCompleted).every((exercise)=>{
            return exercise === true
       });
       console.log(isFinished);
       if (isFinished) {
            completeWorkout();
       } else {
            const index = Math.floor(Math.random() *  workoutCopy.length);
            setCount(index)
            const current =  workoutCopy[index];
            if (current.completed < current.sets )  {
                current.completed++
                console.log(userData);
                setActiveWorkout(workoutCopy)
            } else {
                current.isCompleted = true;
                console.log('Skip');
                nextCard()
            }    
        }
    }
    return (
        <div className="active_workout">
            <Timer setUserData={setUserData} userData={userData}/>
            <Card {... activeWorkout[count]} next={nextCard}/>
        </div>
    )
}