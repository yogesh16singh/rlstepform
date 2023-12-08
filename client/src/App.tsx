import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import StepForm from './components/StepForm';
import Data from './components/Data';
import Register from './components/Register';
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/form" element={<StepForm />} />
        <Route path="/data" element={<Data />} />
      </Routes>
    </>
  )
}

export default App
