import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'

/**
 * Main App Component with Routing
 * 
 * This component sets up all the routes for your application.
 * 
 * Routes:
 * - "/" - Landing page (home page)
 * - "/login" - Login page
 * - "/dashboard" - Dashboard page (protected, requires login)
 * - "/faq" - FAQ page
 */

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

    </Routes>
  )
}

export default App