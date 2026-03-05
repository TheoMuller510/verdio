import { HomePublic } from './pages/Home/HomePublic'
import { HomeDashBoard } from './pages/Home/HomeDashboard'
import { Challenges } from './pages/Challenges'
import { Profile } from './pages/Profile'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/globals/ProtectedRoute'
import { GuestRoute } from './components/globals/GuestRoute'
import { Layout } from './components/globals/Layout'

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePublic />} />
          <Route path="/dashboard" element={<ProtectedRoute><HomeDashBoard /></ProtectedRoute>} />
          <Route path='/challenges' element={<Challenges />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
