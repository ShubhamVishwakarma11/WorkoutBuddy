import {  useEffect } from 'react';
import React from 'react'
import styles from "../styles/Home.module.css"
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutContext } from '../hooks/useWorkoutContext';

export default function Home() {
    const {workouts, dispatch} = useWorkoutContext();

  useEffect( ()=> {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts')
      const json = await response.json()
      
      if (response.ok) {
        dispatch({type: "SET_WORKOUTS", payload: json});
      }
    }

    fetchWorkouts()

  }, [dispatch])

  return (
    <div className={styles["Home"]}>
        <div className={styles["workouts"]}>
            <h2 className={styles["heading"]}> Workouts </h2>
            {workouts && workouts.map( (workout) => (
                <WorkoutDetails key={workout._id} workout={workout}/>
            ))}
        </div>
        <WorkoutForm/>
    </div>
  )
}
