import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TodoProvider } from './contexts'
import { useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos]=useState([])
  const addTodo=(todo)=>{

    // setTodos(todo) 
    //  if we do this, then all values from todos will delete and only todo will inserted
    setTodos((prev)=>[{id:Date.now(), ...todo },...prev])//it will insert todo at the starting, if we add todo after ...prev, then it will add at end
  }
  const updateTodo=(id, todo)=>{
    setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id===id ? todo : prevTodo)))

    // prev.map((eachval)=>{
    //   if(eachval.id===id){
    //     todo
    //   }
    // })
  }
  const deleteTodo=(id)=>{
    setTodos((prev)=>prev.filter((todo)=>todo.id !=id))//filter works on true false
  }


  const toggleComplete=(id)=>{
    setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id===id ? {...prevTodo,completed: !prevTodo.completed }:prevTodo))
  }

  // Local Storage
  // we are using Local Storage because when it reloads, todo don't wipe out when we use LS
  useEffect(()=>{
    // localStorage.getItem("todos")//it gives value in string
    const todos =JSON.parse(localStorage.getItem("todos"))//it takes the item from local storage


    if(todos && todos.length >0){
      setTodos(todos)

    }

  },[])

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos))

  },[todos])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
    <div className="bg-[#1b3c4c] min-h-screen rounded-lg shadow-gray-400 py-10">
      <div className="w-full max-w-2xl mx-auto
      hover:border-spacing-2  shadow-white shadow-sm border-b-2   rounded-lg px-4 py-3 text-white">
        <h1 className="text-3xl font-bold text-center mb-8 mt-2">To-Do List</h1>
        <h2 className='text-xl font-bold m-5  '>List Your Tasks Here</h2>
        <div className="mb-4">
          <TodoForm />
        </div>
        <div className="flex flex-wrap gap-y-3">
          {todos.map((todo)=>(
            <div key={todo.id}
            className='w-full'>
              {/* we avoid index because it is not better way */}
              <TodoItem todo={todo}/>

            </div>
            

          ))}
        </div>
      </div>
    </div>
    </TodoProvider>
  )
}

export default App
