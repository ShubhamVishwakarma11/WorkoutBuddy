import React from 'react'
import useInputState from '../hooks/useInputState'
import useLogin from '../hooks/useLogin'
import styles from '../styles/Login.module.css'

const Login = () => {
    const [email, resetEmail, handleEmailChange] = useInputState('')
    const [password, resetPassword, handlePasswordChange] = useInputState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        await login(email, password)

        resetEmail()
        resetPassword()
    }

    return (
        <div className={styles["login-form-container"]}>
            <form 
                className={styles["login-form"]}
                onSubmit={handleSubmit}
            >
            <h2> Login </h2>
                    <label htmlFor="email"> Email </label>
                    <input 
                        type='email'
                        id="email"
                        onChange={handleEmailChange}
                        value={email}
                    />
                    <label htmlFor="password"> Password </label>
                    <input 
                    type='password'
                        id="password"
                        onChange={handlePasswordChange}
                        value={password}
                    />
                <button disabled={isLoading}> Login </button>
                {error && <div className={styles["error"]}> {error}</div>}
            </form>
        </div>
    )
}

export default Login
