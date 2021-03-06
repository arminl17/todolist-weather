import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';

function TodoList() {
    const [todos, setTodos] = useState([]);

    const addTodo = todo => {
        if(!todo.text || /^\s*$/.test(todo.text)){
            return
        }

        const newTodos = [todo, ...todos];
        setTodos(newTodos);    
    };

    const removeTodo = (id) => {
        const removeArray = [...todos].filter(todo => todo.id !== id)
        setTodos(removeArray);
    }

    const completeTodo = id =>{
        let updatedTodos = todos.map(todo=> {
            if(todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    }
    const updateTodo = (todoId, newValue) => {
        if(!newValue.text || /^\s*$/.test(newValue.text)){
            return
        }
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
        
    }


    return(
        <div><h1>What do you want me to remember?</h1>
        <TodoForm onSubmit ={addTodo}/>
        <Todo
        todos ={todos} completeTodo = {completeTodo} removeTodo = {removeTodo} updateTodo = {updateTodo}/>
        </div>
    )
}

export default TodoList;