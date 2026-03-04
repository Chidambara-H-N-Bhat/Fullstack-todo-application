import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo
} from "../todoSlice"

function Todos() {
  const [text, setText] = useState("")
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState("")
  const dispatch = useDispatch()
  const todos = useSelector(state => state.todos.items)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])
  
  // Format date → Monday, 08 Feb
  const formatDayDateMonth = (dateString) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "2-digit",
      month: "short"
    })
  }

  const handleAdd = () => {
    if (!text.trim()) return
    dispatch(createTodo(text))
    setText("")
  }

  const handleUpdate = (id) => {
    if (!editText.trim()) return
    dispatch(updateTodo({ id, title: editText }))
    setEditId(null)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>

      {/* Add Todo */}
      <div className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          className="border p-2 flex-1"
          placeholder="Add todo"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* Todo List */}
      {todos.map(todo => (
        <div
          key={todo.id}
          className="flex justify-between items-start bg-white p-3 mb-2 rounded shadow-sm"
        >
          {editId === todo.id ? (
            <input
              value={editText}
              onChange={e => setEditText(e.target.value)}
              className="border p-1 flex-1 mr-2"
            />
          ) : (
            <div className="flex flex-col">
              <span className="font-medium">{todo.title}</span>

              {/* Day, Date, Month */}
              <small className="text-gray-500 text-xs">
                {formatDayDateMonth(todo.created_at)}
              </small>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 ml-2">
            {editId === todo.id ? (
              <button
                onClick={() => handleUpdate(todo.id)}
                className="text-green-600"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditId(todo.id)
                  setEditText(todo.title)
                }}
                className="text-blue-600"
              >
                Edit
              </button>
            )}

            <button
              onClick={() => dispatch(deleteTodo(todo.id))}
              className="text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Todos
