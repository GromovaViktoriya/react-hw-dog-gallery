import {useEffect, useState} from "react";

export const Select = ({setStatus, status, setBreed, setError}) => {
    const [optionsBreed, setOptionsBreed] = useState([]);
    const [selectedBreed, setSelectedBreed] = useState('shiba');
    const isSuccess = status === "success";


    useEffect(() => {
        let cancelled = false

        async function loadDogs() {
            setStatus('loading')
            try {
                const response = await fetch(`https://dog.ceo/api/breeds/list/all`)
                const data = await response.json()
                setOptionsBreed(Object.keys(data.message))
                setStatus('success')
            } catch (error) {
                if (!cancelled) setStatus('error')
                setError(error.message)
            }
        }

        void loadDogs()
        return () => {
            cancelled = true
            setStatus('idle')
        }
    }, [])

    const onChangeHandler = (event) => {
        setBreed(event.target.value)
        setSelectedBreed(event.target.value)
    }

    return (
        <div>
            {isSuccess && <select name="Порода" id="select" value={selectedBreed} onChange={onChangeHandler} className='select'>
                {optionsBreed.map((breed, index) => (
                    <option key={index}>{breed}</option>
                ))}
                </select>}
        </div>
    )
}