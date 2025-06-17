import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import ResetPassword from './pages/ResetPassword'
import EmailVerify from './pages/EmailVerify'
import './App.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/EmailVerify' element={<EmailVerify />} />
      </Routes>
    </div>
  )
}

export default App