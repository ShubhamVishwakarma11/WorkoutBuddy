import { useAuthContext } from "./useAuthContext"
import {useNavigate} from 'react-router-dom'
import { useWorkoutContext } from './useWorkoutContext' 

export const useLogout = () => {
    const navigate = useNavigate()
    const {dispatch} = useAuthContext()
    const { dispatch: workoutDispatch} = useWorkoutContext()

    const logout = async () => {
        localStorage.removeItem('user')

        dispatch({type: "LOGOUT"})
        workoutDispatch({type: "SET_WORKOUTS", payload: null})
        navigate('/login')
    }

    return {logout}
}