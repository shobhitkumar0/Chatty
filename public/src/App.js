import React from 'react'
import {BrowserRouter,Routes,Route}  from 'react-router-dom'
import Register from "./pages/Register"
import Chat from "./pages/Chat"
import Login from "./pages/Login"
import SetAvatar from "./pages/SetAvatar"


const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
            <Routes>
              <Route path="/register" element={<Register/>} />
              <Route path="/" element={<Chat />} />
              <Route path="/setAvatar" element={<SetAvatar/>} />
              <Route path="/login" element={<Login/>} />
            </Routes>
         
       
      </div>
    </BrowserRouter>
  )
}

export default App