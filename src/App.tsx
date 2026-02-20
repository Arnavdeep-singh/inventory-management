import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Landing from './pages/Landing'
import PrivateRouter from './components/PrivateRouter'

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
      <Route path="/" element={<Landing />} />
      <Route path="/Signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<PrivateRouter><Home /></PrivateRouter>} />
    </Routes>
  )
}

export default App