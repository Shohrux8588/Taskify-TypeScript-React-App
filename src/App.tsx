import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import InputField from './components/InputField/InputField';

import './App.css';
import { Todo } from './modelTodo';
import TodoList from './components/TodoList/TodoList';
import { json } from 'stream/consumers';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    let todosFromLocalStorage: Todo[] = [];
    const retrievedObject: string | null = localStorage.getItem('todos');
    if (retrievedObject) {
      todosFromLocalStorage = JSON.parse(retrievedObject);
    }
    setTodos(todosFromLocalStorage);

  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      const newTodos: Todo[] = [...todos, { id: new Date().getTime(), todo: todo, isDone: false, }];
      localStorage.setItem('todos', JSON.stringify(newTodos));
      setTodos(todos => newTodos);
      setTodo("");
    }
  }

  const onDragEndHandler = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId
      && destination.index === source.index) {
      return;
    }

    let add: Todo,
      active: Todo[] = [...todos];

    add = todos[source.index];
    active.splice(source.index, 1);
    if (destination.droppableId === "TodosList") {
      add = { ...add, isDone: false };
      active.splice(destination.index, 0, add);
    } else {
      add = { ...add, isDone: true };
      active.splice(destination.index, 0, add);
    }

    localStorage.setItem('todos', JSON.stringify(active));
    setTodos(active);
  }

  return (
    <DragDropContext onDragEnd={onDragEndHandler}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField
          todo={todo}
          setTodo={setTodo}
          handleAdd={handleAdd}
        />

        <TodoList
          todos={todos}
          setTodos={setTodos}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
