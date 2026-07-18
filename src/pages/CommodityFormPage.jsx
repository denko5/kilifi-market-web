import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { getCommodity, createCommodity, updateCommodity } from '../services/commodityService'
import { getCategories } from '../services/commodityCategoryService'

function CommodityFormPage() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [name, setName] = useState('')
  const [unit, setUnit] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(isEditing)

  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  useEffect(() => {
    if (isEditing) {
      getCommodity(id).then((c) => {
        setCategoryId(c.category?.id || '')
        setName(c.name)
        setUnit(c.unit)
        setDescription(c.description || '')
        setLoading(false)
      })
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setSubmitting(true)

    const formData = new FormData()
    formData.append('category_id', categoryId)
    formData.append('name', name)
    formData.append('unit', unit)
    formData.append('description', description)
    if (image) formData.append('image', image)

    try {
      if (isEditing) {
        await updateCommodity(id, formData)
      } else {
        await createCommodity(formData)
      }
      navigate('/commodities')
    } catch (err) {
      setErrors(err.response?.data?.errors || {})
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <MainLayout><p className="text-gray-500">Loading...</p></MainLayout>
  }

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? 'Edit Commodity' : 'Add Commodity'}
      </h1>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          {errors.category_id && <p className="text-red-600 text-xs mt-1">{errors.category_id[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Unit (e.g. Kg, Piece, Litre)</label>
          <input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {errors.unit && <p className="text-red-600 text-xs mt-1">{errors.unit[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full text-sm"
          />
          {errors.image && <p className="text-red-600 text-xs mt-1">{errors.image[0]}</p>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-green-600 text-white px-5 py-2 rounded-md font-medium hover:bg-green-700 disabled:opacity-50"
        >
          {submitting ? 'Saving...' : isEditing ? 'Update Commodity' : 'Create Commodity'}
        </button>
      </form>
    </MainLayout>
  )
}

export default CommodityFormPage