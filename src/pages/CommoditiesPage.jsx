import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import { getCommodities, deleteCommodity } from '../services/commodityService'
import { getCategories } from '../services/commodityCategoryService'

function CommoditiesPage() {
  const [commodities, setCommodities] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { showToast } = useToast()

  const loadCommodities = async () => {
    setLoading(true)
    const params = {}
    if (search) params.search = search
    if (categoryFilter) params.category = categoryFilter
    const data = await getCommodities(params)
    setCommodities(data)
    setLoading(false)
  }

  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  useEffect(() => {
    loadCommodities()
  }, [search, categoryFilter])

  const handleDelete = async (id) => {
    if (!confirm('Delete this commodity?')) return
    try {
      await deleteCommodity(id)
      showToast('Commodity deleted successfully.')
      loadCommodities()
    } catch (err) {
      showToast('Failed to delete commodity.', 'error')
    }
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Commodities</h1>
        {user && (
          <Link
            to="/commodities/new"
            className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
          >
            + Add Commodity
          </Link>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search commodities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm flex-1"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : commodities.length === 0 ? (
        <p className="text-gray-500">No commodities found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {commodities.map((c) => (
            <div key={c.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {c.image_url && (
                <img src={`http://127.0.0.1:8000${c.image_url}`} alt={c.name} className="w-full h-32 object-cover" />
              )}
              <div className="p-4">
                <h2 className="font-semibold text-gray-800">{c.name}</h2>
                <p className="text-xs text-gray-500">{c.category?.name} &middot; {c.unit}</p>
                {user && (
                  <div className="flex gap-3 mt-3 text-sm">
                    <Link to={`/commodities/${c.id}/edit`} className="text-green-600 font-medium">Edit</Link>
                    <button onClick={() => handleDelete(c.id)} className="text-red-600 font-medium">Delete</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </MainLayout>
  )
}

export default CommoditiesPage