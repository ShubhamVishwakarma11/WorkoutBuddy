export const WorkoutReducer = (state, action) => {
    switch (action.type) {
        case "SET_WORKOUTS": 
            return {
                workouts: action.payload
            }
        case "CREATE_WORKOUT": 
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case "REMOVE_WORKOUT": 
            return {
                workouts: state.workouts.filter(workout => workout._id !== action.payload.id)
            }
                
            
        default:
            return state;
    }
} 