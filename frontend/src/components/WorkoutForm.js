import React, {useState} from 'react'
import styles from '../styles/WorkoutForm.module.css'
import {useWorkoutContext} from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext';

export default function WorkoutForm() {
    const {dispatch} = useWorkoutContext();
    const { user } = useAuthContext()

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setTitle('')
            setLoad('')
            setReps('')
            setError("You must login first")
            return 
        }

        const workout = {title, load, reps}

        const response = await fetch(`${process.env.URL}/api/workouts`, {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${user.token}`
            }
        })

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
            console.log(emptyFields);
        }

        if (response.ok) {
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            setEmptyFields([]);
            dispatch({type: "CREATE_WORKOUT", payload: json});
        }
    }

  return (
    <div className={styles["workout-form-container"]}>
        <form 
            className={styles["workout-form"]}
            onSubmit={handleSubmit}
        >
        <h2> Add Workout</h2>
            {/* <div className={styles["title"]}> */}
                <label htmlFor="title">Exercise Title: </label>
                <input 
                    className={emptyFields.includes('title') ? styles['error']:null}
                    id="title"
                    onChange={ (e) => { setTitle(e.target.value)}}
                    value={title}
                />
            {/* </div> */}
            {/* <div className={styles["load"]}> */}
                <label htmlFor="load">Load (in Kg): </label>
                <input 
                    className={emptyFields.includes('load') ? styles['error']:null}
                    id="load"
                    onChange={ (e) => { setLoad(e.target.value)}}
                    value={load}
                />
            {/* </div> */}
            {/* <div className={styles["reps"]}> */}
                <label htmlFor="reps">Reps: </label>
                <input 
                    className={emptyFields.includes('reps') ? styles['error']:null}
                    id="reps"
                    onChange={ (e) => { setReps(e.target.value)}}
                    value={reps}
                />
            {/* </div> */}
            <button>Add Workout</button>
            {error && <div className={styles["error"]}> {error}</div>}
        </form>
    </div>
  )
}
