import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to Todo App
      </h1>

      <button
        onClick={() => navigate("/todos")}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Go to Todos
      </button>
    </div>
  )
}

export default Home
