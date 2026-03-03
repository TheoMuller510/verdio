import { HomePublic } from './pages/Home/HomePublic'
import { HomeDashBoard } from './pages/Home/HomeDashboard'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ProtectedRoute } from './components/globals/ProtectedRoute'
import { GuestRoute } from './components/globals/GuestRoute'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePublic />} />
        <Route path="/dashboard" element={<ProtectedRoute><HomeDashBoard /></ProtectedRoute>} />
        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
