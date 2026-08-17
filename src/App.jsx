import {useEffect, useState} from 'react'
import './App.css'
import {Gallery} from "./components/Gallery.jsx";
import {Select} from "./components/Select.jsx";
import {Input} from "./components/Input.jsx";

function App() {
    const [quantity, setQuantity] = useState(4)
    const [breed, setBreed] = useState('Shiba')
    const [status, setStatus] = useState('idle')
    const [images, setImages] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        let cancelled = false

        async function loadDogs() {
            setStatus('loading')
            try {
                const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/${quantity}`)
                const data = await response.json()
                setImages(data.message)
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
    }, [quantity, breed])

    return (
        <div className="App">
            <h1 className='title'>Галерея собак</h1>
            <Input quantity={quantity} setQuantity={setQuantity} />
            <Select setBreed={setBreed} setStatus={setStatus} status={status} setError={setError} />
            {status === 'loading' && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {status === 'success' && <Gallery images={images}/>}
        </div>
    )
}

export default App
