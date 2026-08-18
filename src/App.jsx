import {useEffect, useState} from 'react'
import './App.css'
import {Gallery} from "./components/Gallery.jsx";
import {Select} from "./components/Select.jsx";
import {Input} from "./components/Input.jsx";
import {baseUrl} from "./constants/constants.js";


function App() {
    const [quantity, setQuantity] = useState(4)
    const [breed, setBreed] = useState('Shiba')
    const [status, setStatus] = useState('idle')
    const [images, setImages] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        async function loadDogs() {
            setStatus('loading')
            try {
                const response = await fetch(`${baseUrl}breed/${breed}/images/random/${quantity}`, {signal: controller.signal})
                const data = await response.json()
                setImages(data.message.map(image => {
                    return {image, id: crypto.randomUUID()}
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
    }, [quantity, breed])

    return (
        <div className="App">
            <h1 className='title'>Галерея собак</h1>
            <Input quantity={quantity} setQuantity={setQuantity} setError={setError}/>
            <Select setBreed={setBreed} setStatus={setStatus} status={status} setError={setError}/>
            {status === 'loading' && <p>Loading...</p>}
            {error && <p className='error'>{error}</p>}
            {status === 'success' && <Gallery images={images}/>}
        </div>
    )
}

export default App
