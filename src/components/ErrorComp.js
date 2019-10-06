import React, {useContext} from 'react';
import WorkoutContext from '../context/workout-context';

export default (props) => {
    const {error} = useContext(WorkoutContext);
     
    return (
        <div>
            {error}
        </div>
    )
}