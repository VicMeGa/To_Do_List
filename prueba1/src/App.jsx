// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Container from './components/Container.jsx';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import  Login  from  './components/Login/Login.jsx';
import Register from './components/Login/Register.jsx';
import Fondo from './components/Fondo.jsx'
function App() {
 // const [count, setCount] = useState(0)

    return (
        <>
            <title>To Do List</title>
            <Fondo />
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Container />} />
                </Routes>
            </Router>
      </>
  );
}

export default App
