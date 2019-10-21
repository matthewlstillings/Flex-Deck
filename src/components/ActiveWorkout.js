import React, {useContext, useState, useEffect} from 'react';
import WorkoutContext from '../context/workout-context';
import Card from './Card';
import Timer from './Timer';

export default (props) => {
    const {setIsActive, user, updateUser, currentWorkout, setCurrentWorkout} = useContext(WorkoutContext);
    const [activeExercise, setActiveExercise] = useState();
    const [history, setHistory] = useState([]);
    const [userData, setUserData] = useState({
        ...user,
        totalWorkouts: user.totalWorkouts + 1,
        previousWorkout: {
            time: ''
        }
    });
    useEffect(()=>{
      nextCard();
    },[])
    const completeWorkout = () => {
        setIsActive(false);
        const workoutCopy = currentWorkout.map((exercise)=> {
            return {
                ...exercise,
                completed: 0,
                isCompleted: false
            }
        })
        setCurrentWorkout(workoutCopy);
        const userInfo = {
            ...userData,
            totalReps:  userData.totalReps + history.map((exercise)=>exercise.reps).reduce((a, b)=>a + b, 0),
            previousWorkout: {
                ...userData.previousWorkout,
                routine: history
            }
        }
        updateUser(userInfo);
        setTimeout(()=> {
            localStorage.setItem('user', JSON.stringify(userInfo))
        },1000)
    }
    const nextCard = () => {  
        const workoutCopy = currentWorkout.slice();
        const isFinished = workoutCopy.map(exercise=> exercise.isCompleted).every((exercise)=>{
            return exercise === true
       });
       if (isFinished) {
            
            completeWorkout();
       } else {
            const index = Math.floor(Math.random() *  workoutCopy.length);
            const current =  workoutCopy[index];
            current.reps = Math.floor(Math.random() * 15) + 5;
            if (current.completed < current.sets )  {
                setActiveExercise(current);
                current.completed++;
                setCurrentWorkout(workoutCopy)
                setHistory(history=>[...history, current])
            } else {
                current.isCompleted = true;
                nextCard()
            }    
        }
    }
    return (
        <div className="active_workout">
            <Timer setUserData={setUserData} userData={userData}/>
            <Card {...activeExercise} next={nextCard}/>
        </div>
    )
}