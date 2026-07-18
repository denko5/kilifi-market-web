import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { getMarket, createMarket, updateMarket } from '../services/marketService'

function MarketFormPage() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(isEditing)

  useEffect(() => {
    if (isEditing) {
      getMarket(id).then((market) => {
        setName(market.name)
        setLocation(market.location)
        setDescription(market.description || '')
        setLoading(false)
      })
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setSubmitting(true)

    try {
      const payload = { name, location, description }
      if (isEditing) {
        await updateMarket(id, payload)
      } else {
        await createMarket(payload)
      }
      navigate('/markets')
    } catch (err) {
      setErrors(err.response?.data?.errors || {})
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <p className="text-gray-500">Loading...</p>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? 'Edit Market' : 'Add Market'}
      </h1>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.location && <p className="text-red-600 text-xs mt-1">{errors.location[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-green-600 text-white px-5 py-2 rounded-md font-medium hover:bg-green-700 disabled:opacity-50"
        >
          {submitting ? 'Saving...' : isEditing ? 'Update Market' : 'Create Market'}
        </button>
      </form>
    </MainLayout>
  )
}

export default MarketFormPage