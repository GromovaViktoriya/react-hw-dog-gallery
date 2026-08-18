import {useEffect, useState} from "react";
import {baseUrl} from "../constants/constants.js";

export const Select = ({setStatus, status, setBreed, setError}) => {
    const [optionsBreed, setOptionsBreed] = useState([]);
    const [selectedBreed, setSelectedBreed] = useState('shiba');
    const isSuccess = status === "success";


    useEffect(() => {
        const controller = new AbortController()

        async function loadDogs() {
            setStatus('loading')
            try {
                const response = await fetch(`${baseUrl}breeds/list/all`, { signal: controller.signal })
                const data = await response.json()
                setOptionsBreed(Object.keys(data.message).map(breed => {
                   return {breed, id: crypto.randomUUID()}
                }))
                setStatus('success')
            } catch (error) {
                if (error.name !== 'AbortError') {
                    setStatus('error')
                    setError(error.message)
                }
            }
        }

        void loadDogs()
        return () => {
            controller.abort()
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
                {optionsBreed.map(option => (
                    <option key={option.id}>{option.breed}</option>
                ))}
                </select>}
        </div>
    )
}