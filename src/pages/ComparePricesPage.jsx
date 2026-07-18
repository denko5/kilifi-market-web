import { useState, useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import { getCommodities } from '../services/commodityService'
import { comparePrices } from '../services/priceService'

function ComparePricesPage() {
  const [commodities, setCommodities] = useState([])
  const [commodityId, setCommodityId] = useState('')
  const [comparison, setComparison] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getCommodities().then(setCommodities)
  }, [])

  useEffect(() => {
    if (!commodityId) {
      setComparison(null)
      return
    }
    setLoading(true)
    comparePrices(commodityId)
      .then(setComparison)
      .finally(() => setLoading(false))
  }, [commodityId])

  const sortedMarkets = comparison?.markets?.length
    ? [...comparison.markets].sort((a, b) => a.price - b.price)
    : []

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Compare Prices Across Markets</h1>

      <div className="max-w-sm mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select a commodity</label>
        <select
          value={commodityId}
          onChange={(e) => setCommodityId(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="">Choose a commodity</option>
          {commodities.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {loading && <p className="text-gray-500">Comparing prices...</p>}

      {comparison && !loading && (
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            {comparison.commodity} — Today's Prices by Market
          </h2>

          {sortedMarkets.length === 0 ? (
            <p className="text-gray-500">No prices recorded today for this commodity.</p>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-100">
              {sortedMarkets.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between px-4 py-3 ${idx === 0 ? 'bg-green-50' : ''}`}
                >
                  <span className="text-gray-700">{m.market}</span>
                  <span className="font-semibold text-gray-800">
                    {m.currency} {m.price}
                    {idx === 0 && (
                      <span className="ml-2 text-xs text-green-600 font-medium">Cheapest</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </MainLayout>
  )
}

export default ComparePricesPage