import React, {useContext} from 'react';
import WorkoutContext from '../context/workout-context';
import {workout} from '../data/workouts';

export const useGetData = (filter) => {
    const {setError} = useContext(WorkoutContext);
    console.log(workout[filter]);
    const workouts = workout[filter]
    const errorString = 'The Data was gotten'
    setError(errorString);
    const data = filter ? (workouts.map((cise)=> {
            return cise;
        }) 
    ) : (
        workouts.map((cise)=> {
            return cise;
        })
    )
    return data;
}