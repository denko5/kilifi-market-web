import { useState, useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import { useAuth } from '../contexts/AuthContext'
import { getMarkets, deleteMarket } from '../services/marketService'
import { Link } from 'react-router-dom'

function MarketsPage() {
  const [markets, setMarkets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useAuth()

  const loadMarkets = async () => {
    setLoading(true)
    try {
      const data = await getMarkets()
      setMarkets(data)
    } catch (err) {
      setError('Failed to load markets.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMarkets()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this market?')) return
    try {
      await deleteMarket(id)
      loadMarkets()
    } catch (err) {
      setError('Failed to delete market.')
    }
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Markets</h1>
        {user && (
          <Link
            to="/markets/new"
            className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
          >
            + Add Market
          </Link>
        )}
      </div>

      {error && <div className="bg-red-50 text-red-700 text-sm rounded-md p-3 mb-4">{error}</div>}

      {loading ? (
        <p className="text-gray-500">Loading markets...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {markets.map((market) => (
            <div key={market.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-800">{market.name}</h2>
              <p className="text-sm text-gray-500">{market.location}</p>
              {market.description && (
                <p className="text-sm text-gray-600 mt-2">{market.description}</p>
              )}
              <span
                className={`inline-block mt-3 text-xs px-2 py-1 rounded-full ${
                  market.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {market.is_active ? 'Active' : 'Inactive'}
              </span>

              {user && (
                <div className="flex gap-3 mt-4 text-sm">
                  <Link to={`/markets/${market.id}/edit`} className="text-green-600 font-medium">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(market.id)}
                    className="text-red-600 font-medium"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </MainLayout>
  )
}

export default MarketsPage