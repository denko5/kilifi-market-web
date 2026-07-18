import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    setMenuOpen(false)
    await logout()
    navigate('/login')
  }

  const linkClass = 'hover:text-green-200 block sm:inline'

  return (
    <nav className="bg-green-700 text-white px-6 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-lg font-bold" onClick={() => setMenuOpen(false)}>
          Kilifi Market Tracker
        </Link>

        <button
          className="sm:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <div className="hidden sm:flex items-center gap-6 text-sm">
          <Link to="/" className={linkClass}>Prices</Link>
          <Link to="/markets" className={linkClass}>Markets</Link>
          <Link to="/commodities" className={linkClass}>Commodities</Link>
          <Link to="/compare" className={linkClass}>Compare</Link>

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
      </div>

      {menuOpen && (
        <div className="sm:hidden flex flex-col gap-3 mt-4 text-sm">
          <Link to="/" className={linkClass} onClick={() => setMenuOpen(false)}>Prices</Link>
          <Link to="/markets" className={linkClass} onClick={() => setMenuOpen(false)}>Markets</Link>
          <Link to="/commodities" className={linkClass} onClick={() => setMenuOpen(false)}>Commodities</Link>
          <Link to="/compare" className={linkClass} onClick={() => setMenuOpen(false)}>Compare</Link>

          {user ? (
            <>
              <span className="text-green-200">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-green-800 hover:bg-green-900 px-3 py-1.5 rounded-md w-fit"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-green-800 hover:bg-green-900 px-3 py-1.5 rounded-md w-fit"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar