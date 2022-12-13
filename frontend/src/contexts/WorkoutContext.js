import { createContext, useReducer } from 'react';
import { WorkoutReducer } from '../reducers/WorkoutReducer';

export const WorkoutContext = createContext();

export const WorkoutContextProvider = (props) => {
    const [state, dispatch] = useReducer(WorkoutReducer, {
        workouts: null
    });

    return (
        <WorkoutContext.Provider value={{...state, dispatch}}>
            {props.children}
        </WorkoutContext.Provider>
    )
}