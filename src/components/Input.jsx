import {useState} from "react";

export const Input = ({quantity, setQuantity, setError}) => {
    const [count, setCount] = useState(0)
    const [inputValue, setInputValue] = useState(quantity)

    const onSubmitHandler = (event) => {
        event.preventDefault()
        setCount((prev) => prev + 1)
        if (inputValue > 1 && inputValue <= 50) {
            setQuantity(inputValue)
            setError(null)
        } else {
            setError('Введите число от 1 до 50!')
        }
    }

    const onChangeHandler = (event) => {
        setInputValue(event.target.value)
    }

    return (
        <div className="input-wrapper">
            <p className='text'>Картинки обновлены {count} раз(а)</p>
            <form onSubmit={onSubmitHandler} className='form'>
                <label htmlFor="input" className='label'>Показать</label>
                <input type="text" id='input' value={inputValue} onChange={onChangeHandler} className='input'/>
                <button onSubmit={onSubmitHandler} className='inputBtn'>Обновить</button>
            </form>
        </div>
    )
}