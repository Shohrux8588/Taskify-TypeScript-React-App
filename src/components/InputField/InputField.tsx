import React, { useRef } from 'react'

interface props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<props> = ({ todo, setTodo, handleAdd }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <form className='input' onSubmit={(e) => {
            handleAdd(e);
            if (inputRef.current) {
                inputRef.current.blur();
            }
        }}>
            <input
                type="input"
                placeholder='Enter a task'
                className='input__box'
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                ref={inputRef}
            />
            <button
                className='input__submit'
                type='submit'>
                Go
            </button>
        </form>
    )
}

export default InputField