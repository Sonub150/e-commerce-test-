import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'  // Ensure file is named Login.jsx
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'  // Ensure file is ResetPassword.jsx

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Login/>}/> {/* Same component handles both login and register */}
      <Route path='/resetPassword' element={<ResetPassword/>}/>
      <Route path='/EmailVerify' element={<EmailVerify/>}/>
    </Routes>
  )
}

export default App