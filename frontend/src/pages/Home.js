import {  useEffect } from 'react';
import React from 'react'
import styles from "../styles/Home.module.css"
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import {useAuthContext} from '../hooks/useAuthContext'

export default function Home() {
    const { user } = useAuthContext()
    const {workouts, dispatch} = useWorkoutContext()

  useEffect( ()=> {
    const fetchWorkouts = async () => {
      if (!user) {
        return 
      }
      const response = await fetch(`${process.env.URL}/api/workouts`, {
        headers : {
          'Authorization': `bearer ${user.token}`
        }
      })
      const json = await response.json()
      
      if (response.ok) {
        dispatch({type: "SET_WORKOUTS", payload: json});
      }
    }

    fetchWorkouts()

  }, [dispatch, user])

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
