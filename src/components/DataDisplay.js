import React, {useContext} from 'react';
import WorkoutContext from '../context/workout-context';
import {useGetData} from './GetDataHook';

export default (props) => {
    const data = useGetData(props.filters);
     
    return (
        <div>
            {
                data.map((cise)=>{
                    return (
                        <div>
                            {cise.name}
                        </div>
                    )
                })
            }
        </div>
    )
}