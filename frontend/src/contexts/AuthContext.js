import {createContext, useReducer, useEffect} from 'react'
import { AuthReducer } from '../reducers/AuthReducer'

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, {
        user: null
    })

    useEffect( () => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch({type:"LOGIN", payload: user})
        }
    }, [])
    
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )        
}