import React from 'react'
import styles from '../styles/WorkoutDetails.module.css'
import close from '../icons/trash.png'
import { useWorkoutContext } from '../hooks/useWorkoutContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function WorkoutDetails({workout}) {
  const {dispatch} = useWorkoutContext();
  const handleClick = async () => {
    const response = await fetch(`/api/workouts/${workout._id}`,{
      method:'DELETE'
    })

    const json = await response.json();

    if (!response.ok) {
        console.log("error in deleting workout", json);
    }

    if (response.ok) {
        dispatch({type: "REMOVE_WORKOUT", payload: {id:workout._id}});
    }
  }
  return (
    <div className={styles['workout-details']}>
        <h4>{workout.title}</h4>
        <p><strong>Load: </strong> {workout.load} </p>
        <p><strong>Reps: </strong> {workout.reps} </p>
        <p>{formatDistanceToNow( new Date(workout.createdAt), {addSuffix:true})}</p>
        <button 
          className={styles["del-btn"]}
          onClick={handleClick}
        >
          <img src={close} alt="close-btn"/>
        </button>
    </div>
  )
}
