import { useState } from "react" 

const useInputState = (initialValue) => {
    const [state, setState] = useState(initialValue) 

    const reset = () => {
        setState('')
    }

    const handleStateChange = (e) => {
        setState(e.target.value)
    }

    return [state, reset, handleStateChange]
}

export default useInputState