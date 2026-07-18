import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import MarketsPage from './pages/MarketsPage'
import MarketFormPage from './pages/MarketFormPage'
import ProtectedRoute from './components/ProtectedRoute'
import CommoditiesPage from './pages/CommoditiesPage'
import CommodityFormPage from './pages/CommodityFormPage'
import PriceFormPage from './pages/PriceFormPage'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/markets" element={<MarketsPage />} />
        <Route
          path="/markets/new"
          element={
            <ProtectedRoute>
              <MarketFormPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/markets/:id/edit"
          element={
            <ProtectedRoute>
              <MarketFormPage />
            </ProtectedRoute>
          }
        />
        <Route path="/commodities" element={<CommoditiesPage />} />
        <Route
          path="/commodities/new"
          element={<ProtectedRoute><CommodityFormPage /></ProtectedRoute>}
        />
        <Route
          path="/commodities/:id/edit"
          element={<ProtectedRoute><CommodityFormPage /></ProtectedRoute>}
        />
        <Route path="/prices/new" element={<ProtectedRoute><PriceFormPage /></ProtectedRoute>} />
        <Route path="/prices/:id/edit" element={<ProtectedRoute><PriceFormPage /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  )
}

export default App