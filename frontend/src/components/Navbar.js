import React from 'react'
import { Link } from 'react-router-dom'
import styles from "../styles/Navbar.module.css"

export default function Navbar() {
  return (
    <header className={styles["Navbar"]}>
        <Link to="/">
            <h1 className={styles["heading"]}> Workout Buddy </h1>
        </Link>
    </header>
  )
}
