import React, { useEffect, useRef, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd';

import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md'
import { Todo } from '../../../modelTodo'

interface props {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    index: number;
}

const SingleTodo: React.FC<props> = ({ todo, todos, setTodos, index }) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editedText, setEditedText] = useState<string>(todo.todo);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEdit]);

    const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedText(e.target.value);
    }

    const handleDelete = (todoID: number) => {
        const filteredTodos = todos.filter(todo => todo.id !== todoID);
        localStorage.setItem('todos', JSON.stringify(filteredTodos));
        setTodos(filteredTodos);
    }

    const handleDone = (todoID: number) => {
        const filteredTodos = todos.map(todo => {
            if (todo.id !== todoID) {
                return todo;
            } else {
                return { ...todo, isDone: !todo.isDone }
            }
        });
        localStorage.setItem('todos', JSON.stringify(filteredTodos));
        setTodos(filteredTodos);
    }

    const handleSubmit = (e: React.FormEvent, todoID: number) => {
        e.preventDefault();
        if (editedText === todo.todo) {
            setIsEdit(false);
        }

        if (editedText) {
            const editedTodos = todos.map(todo => {
                if (todo.id !== todoID) {
                    return todo;
                } else {
                    return { ...todo, todo: editedText }
                }
            })
            localStorage.setItem('todos', JSON.stringify(editedTodos));
            setTodos(editedTodos);
            setIsEdit(false);
        }

    }

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided, snapshot) => (
                <form
                    className={`todos__single ${snapshot.isDragging ? 'drag' : ''} `}
                    onSubmit={e => handleSubmit(e, todo.id)}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {isEdit ? (
                        <input ref={inputRef} value={editedText} onChange={handleEdit} className="todos_single-text" />
                    ) :
                        todo.isDone ? (
                            <s className='todos__single--text'>
                                {todo.todo}
                            </s>
                        ) : (
                            <span className='todos__single--text'>
                                {todo.todo}
                            </span>

                        )
                    }
                    <span className="icon" onClick={() => {
                        if (!isEdit && !todo.isDone) {
                            setIsEdit(!isEdit);
                        }
                    }}>
                        <AiFillEdit />
                    </span>
                    <span className="icon" onClick={() => handleDelete(todo.id)}>
                        <AiFillDelete />
                    </span>
                    <span className="icon" onClick={() => handleDone(todo.id)}>
                        <MdDone />
                    </span>
                </form>
            )}

        </Draggable >
    )
}

export default SingleTodo;
