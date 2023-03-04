import { useState } from "react";
import { useAuthContext} from './useAuthContext'
import { useNavigate } from "react-router-dom";

const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const navigate = useNavigate()

    const login = async (email, password) => {
        setError(null)
        setIsLoading(true)

        const response = await fetch(`${process.env.URL}/api/user/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({type: "LOGIN", payload: json})

            setIsLoading(false)
            navigate('/')
        }
    }

    return {login, error, isLoading}
}

export default useLogin