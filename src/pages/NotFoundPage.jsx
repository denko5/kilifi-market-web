import { Link } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

function NotFoundPage() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-6xl font-bold text-green-700 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link
          to="/"
          className="bg-green-600 text-white px-5 py-2 rounded-md font-medium hover:bg-green-700"
        >
          Back to Home
        </Link>
      </div>
    </MainLayout>
  )
}

export default NotFoundPage