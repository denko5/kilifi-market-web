import { useState, useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import { useAuth } from '../contexts/AuthContext'
import { getTodayPrices, deletePrice } from '../services/priceService'
import { Link } from 'react-router-dom'

function HomePage() {
  const [prices, setPrices] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const loadPrices = async () => {
    setLoading(true)
    const data = await getTodayPrices()
    setPrices(data)
    setLoading(false)
  }

  useEffect(() => {
    loadPrices()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this price entry?')) return
    await deletePrice(id)
    loadPrices()
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Today's Market Prices</h1>
        {user && (
          <Link
            to="/prices/new"
            className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
          >
            + Add Price
          </Link>
        )}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : prices.length === 0 ? (
        <p className="text-gray-500">No prices recorded for today yet.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-4 py-3">Commodity</th>
                <th className="px-4 py-3">Market</th>
                <th className="px-4 py-3">Price</th>
                {user && <th className="px-4 py-3">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {prices.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3 font-medium text-gray-800">{p.commodity?.name}</td>
                  <td className="px-4 py-3 text-gray-600">{p.market?.name}</td>
                  <td className="px-4 py-3 text-gray-800">
                    {p.currency} {p.price}
                  </td>
                  {user && (
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <Link to={`/prices/${p.id}/edit`} className="text-green-600 font-medium">Edit</Link>
                        <button onClick={() => handleDelete(p.id)} className="text-red-600 font-medium">Delete</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </MainLayout>
  )
}

export default HomePage