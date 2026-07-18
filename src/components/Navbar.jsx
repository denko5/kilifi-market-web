import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-lg font-bold">
        Kilifi Market Tracker
      </Link>

      <div className="flex items-center gap-6 text-sm">
        <Link to="/" className="hover:text-green-200">Prices</Link>
        <Link to="/markets" className="hover:text-green-200">Markets</Link>
        <Link to="/commodities" className="hover:text-green-200">Commodities</Link>
        <Link to="/compare" className="hover:text-green-200">Compare</Link>

        {user ? (
          <>
            <span className="text-green-200">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-green-800 hover:bg-green-900 px-3 py-1.5 rounded-md"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-green-800 hover:bg-green-900 px-3 py-1.5 rounded-md">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar