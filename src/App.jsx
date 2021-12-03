import React, {Fragment, useState, useRef, useEffect}  from 'react';
import { TodoList } from './components/TodoList'
import { v5 as uuid } from 'uuid'

const KEY = 'todoApp.todos'

export function App() {

    // useState
    // Nos permite craer variables para cambiar el estado de los datos
    const [todos, setTodos] = useState([
        {id: 1, task: "Tarea 1", completed: false}
    ])

    const todoTaskRef = useRef()

    // useEffect es usado para para ejecutar codigo una vez que el componente se renderice
    // ya sea para actulizar datos o al inializar la app

    // Obtengo los datos del localStorage
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY)) 
        if(storedTodos) {
            setTodos(storedTodos)
        }
       
    }, [])

    // Guardar datos al local Storage
    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos))
    }, [todos])
    
    // Agregar nueva tarea
    const handlerAddTodo = () => {
        const task = todoTaskRef.current.value;

        if(task === '') return 

        setTodos((preventTodos) => {
            return [...preventTodos, {
                id: uuid(), task, completed: false
            }]
        })

        todoTaskRef.current.value = "";
    }

    // Eliminar tareas complidas
    const handleClearAll = () => {
        const newTodos = todos.filter((todo) => !todo.completed)
        setTodos(newTodos)
    }  

    // Cabiar estado de la tarea complido o no
    const toggleTodo = (id) => {
        const newTodos = [...todos]
        const todo = newTodos.find((todo) => todo.id === id)
        todo.completed = !todo.completed
        setTodos(newTodos)
    }

    return (
        // Fragment permite encapsular todos los elementos del HTML y engloba todo el CSS para este componente
        <Fragment>

            <div>
                <h1>Lista de Tareas</h1>
            </div>

            <TodoList todos={todos} toggleTodo={toggleTodo}/>
            <input ref={todoTaskRef} type="text" placeholder='Tarae' />

            <button onClick={handlerAddTodo}> + </button>
            
            <button onClick={handleClearAll}> - </button>

            <div>
                Te quedan { todos.filter((todo) => !todo.completed).length } tareas por cumplir
            </div>
        </Fragment>
    )
}
