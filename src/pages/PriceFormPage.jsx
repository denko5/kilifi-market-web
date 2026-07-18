import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { useToast } from '../contexts/ToastContext'
import { getPrice, createPrice, updatePrice } from '../services/priceService'
import { getMarkets } from '../services/marketService'
import { getCommodities } from '../services/commodityService'

function PriceFormPage() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [markets, setMarkets] = useState([])
  const [commodities, setCommodities] = useState([])
  const [marketId, setMarketId] = useState('')
  const [commodityId, setCommodityId] = useState('')
  const [price, setPrice] = useState('')
  const [priceDate, setPriceDate] = useState(new Date().toISOString().slice(0, 10))
  const [remarks, setRemarks] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(isEditing)

  useEffect(() => {
    getMarkets().then(setMarkets)
    getCommodities().then(setCommodities)
  }, [])

  useEffect(() => {
    if (isEditing) {
      getPrice(id).then((p) => {
        setMarketId(p.market?.id || '')
        setCommodityId(p.commodity?.id || '')
        setPrice(p.price)
        setPriceDate(p.price_date)
        setRemarks(p.remarks || '')
        setLoading(false)
      })
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setSubmitting(true)

    try {
      if (isEditing) {
        await updatePrice(id, { price, price_date: priceDate, remarks })
        showToast('Price updated successfully.')
      } else {
        await createPrice({
          market_id: marketId,
          commodity_id: commodityId,
          price,
          currency: 'KES',
          price_date: priceDate,
          remarks,
        })
        showToast('Price created successfully.')
      }
      navigate('/')
    } catch (err) {
      setErrors(err.response?.data?.errors || {})
      showToast('Please fix the errors and try again.', 'error')
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
        {isEditing ? 'Edit Price' : 'Add Price'}
      </h1>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        {!isEditing && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Market</label>
              <select
                value={marketId}
                onChange={(e) => setMarketId(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select market</option>
                {markets.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
              {errors.market_id && <p className="text-red-600 text-xs mt-1">{errors.market_id[0]}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Commodity</label>
              <select
                value={commodityId}
                onChange={(e) => setCommodityId(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select commodity</option>
                {commodities.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              {errors.commodity_id && <p className="text-red-600 text-xs mt-1">{errors.commodity_id[0]}</p>}
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (KES)</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {errors.price && <p className="text-red-600 text-xs mt-1">{errors.price[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={priceDate}
            onChange={(e) => setPriceDate(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows={2}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-green-600 text-white px-5 py-2 rounded-md font-medium hover:bg-green-700 disabled:opacity-50"
        >
          {submitting ? 'Saving...' : isEditing ? 'Update Price' : 'Create Price'}
        </button>
      </form>
    </MainLayout>
  )
}

export default PriceFormPage