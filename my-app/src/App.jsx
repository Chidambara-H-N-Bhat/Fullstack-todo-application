import {BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/Home"
import Todos from "./pages/Todos"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

