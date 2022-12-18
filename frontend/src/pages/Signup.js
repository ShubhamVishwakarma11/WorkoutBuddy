import React from 'react'
import useInputState from '../hooks/useInputState'
import useSignup from '../hooks/useSignup'
import styles from '../styles/Signup.module.css'

const Signup = () => {
    const [email, resetEmail, handleEmailChange] = useInputState('')
    const [password, resetPassword, handlePasswordChange] = useInputState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        await signup(email, password)

        resetEmail()
        resetPassword()
    }

    return (
        <div className={styles["signup-form-container"]}>
            <form 
                className={styles["signup-form"]}
                onSubmit={handleSubmit}
            >
            <h2> Signup </h2>
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
                <button disabled={isLoading}> Signup </button>
            {error && <div className={styles["error"]}> {error}</div>}
            </form>
        </div>
    )
}

export default Signup
