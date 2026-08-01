import { useUser } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser()
  if (!isLoaded) return <div className="p-8 text-center">Loading...</div>
  if (!isSignedIn) return <Navigate to="/sign-in" replace />
  return children
}