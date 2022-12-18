import React from 'react'
import { Link } from 'react-router-dom'
import styles from "../styles/Navbar.module.css"
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Navbar() {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = async () => {
    await logout()
  }
  return (
    <header className={styles["Navbar"]}>
        <Link to="/">
            <h1 className={styles["heading"]}> Workout Buddy </h1>
        </Link>
        <div className={styles["links-container"]}>

          {user ? 
            <>
              <p> {user.email}</p>
              <button onClick={handleClick}> Logout </button>
            </>
          :
            <>
              <Link to="/signup">
                  <p className={styles["links"]}> Signup </p>
              </Link>
              <Link to="/login">
                  <p className={styles["links"]}> Login </p>
              </Link>
            </>  
          }

          
          
        </div>
    </header>
  )
}
