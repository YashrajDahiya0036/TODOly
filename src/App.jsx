import Button from './components/Button.jsx'
import { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem("todos")) || [])
  // () => JSON.parse(localStorage.getItem("todos")) ||
  const [todo, setTodo] = useState('')
  const [isEditable, setisEditable] = useState(false)
  const inputRef = useRef(null)
  const indexRef = useRef(null)
  const [showCompleted, setShowCompleted] = useState(true)

  // useEffect(() => {
  //   let todosString = localStorage.getItem("todos")
  //   console.log(todosString)
  //   if (todosString) {
  //     let todo = JSON.parse(todosString)
  //     console.log(todo)
  //     setTodos(todo)
  //   }
  // }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


  function handleTodo(e) {
    setTodo(e.target.value)
  }

  function handleAdd() {
    if (todo.trim() !== '') {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
      setTodo('')
    }
  }

  function handleDelete(id) {
    let tempTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(tempTodos)
  }

  function handleCheckbox(e) {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let tempTodos = [...todos]
    tempTodos[index].isCompleted = !tempTodos[index].isCompleted
    setTodos(tempTodos)
    // setTodos(todos.map((item,i)=>{
    //   i===index?{...item,isCompleted:!item.isCompleted} : item
    // }))
  }

  function handleEdit(id) {
    setisEditable(true)
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let tempTodos = [...todos]
    indexRef.current = index
    setTodo(tempTodos[index].todo)
  }

  function handleUpdate() {
    let tempTodos = [...todos]
    tempTodos[indexRef.current].todo = todo
    setTodos(tempTodos)
    // setTodos(todos.map((item,i)=>{
    //   i===indexRef.current ? {...item,todo:todo}:item
    // }))
    setTodo('')
    setisEditable(false)
  }

  function handleUP(id) {
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let tempTodos = [...todos]
    if (index > 0) {
      [tempTodos[index], tempTodos[index - 1]] = [tempTodos[index - 1], tempTodos[index]]
      setTodos(tempTodos)
    }
  }

  function HandleDown(id) {
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let tempTodos = [...todos]
    if (index < tempTodos.length - 1) {
      [tempTodos[index], tempTodos[index + 1]] = [tempTodos[index + 1], tempTodos[index]]
      setTodos(tempTodos)
    }
  }

  function toggleshowCompleted(){
    setShowCompleted(!showCompleted)
  }


  return (
    <>
      <div className="container bg-green-200 h-[70vh] rounded-xl flex flex-col items-center m-auto mt-10 pb-10 text-xl">
        <div className="input-todo mx-auto flex justify-center items-center my-10">
          <input type="text" ref={inputRef} onChange={handleTodo} value={todo} placeholder='Enter a Task' className='bg-white rounded p-1 m-1 border-2 border-gray-300 w-[40vw]' />
          {isEditable ? <Button name="Update" color="blue" onClick={handleUpdate}></Button> : <Button name="Add" color="blue" onClick={handleAdd}></Button>}
        </div>
        <div className='w-full ml-20 mb-5 flex items-center gap-2'>
        <input className='pr-10' type="checkbox" onChange={toggleshowCompleted} checked={showCompleted}/>Show Completed
        </div>
        <div className="list-todo w-full px-10 overflow-auto">
          {todos.map((element) => {
            return( (showCompleted || !element.isCompleted)&&
            <div key={element.id} className="flex items-center justify-between gap-4 w-full mb-5 border-2 rounded p-2 border-green-300">
              <div className="flex items-center gap-2 flex-1">
                <input className='w-5 h-5 rounded-xl text-blue-950 bg-white border-2 border-black hover:ring-2 hover:ring-green-400 cursor-pointer' type="checkbox" name={element.id} onChange={handleCheckbox} checked={element.isCompleted} />
                <div className={element.isCompleted ? "line-through break-words max-h-30 overflow-y-auto" : "break-words max-h-20 overflow-y-auto font-bold"}>{element.todo}</div>
              </div>
              <div className='flex flex-col gap-1 sm:flex-row'>
                <div className='flex items-center gap-1'>
                  <Button name="UP" color="yellow" onClick={() => handleUP(element.id)}></Button>
                  <Button name="Down" color="yellow" onClick={() => HandleDown(element.id)}></Button>
                </div>
                <div className='flex items-center gap-1'>
                  <Button name="Edit" color="blue" onClick={() => handleEdit(element.id)}></Button>
                  <Button name="Delete" color="red" onClick={() => handleDelete(element.id)} />
                </div>
              </div>
            </div>
            )
          })}
        </div>

      </div>
    </>
  )
}

export default App
