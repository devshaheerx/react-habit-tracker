import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import Navbar from './components/Navbar'
import Router from './routes/Router'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const hasHandledWelcome = useRef(false)

  const hideNavbar = location.pathname.startsWith('/sign-in') || location.pathname.startsWith('/sign-up')

  useEffect(() => {
    const params = new URLSearchParams(location.search)

    if (params.has('welcome') && !hasHandledWelcome.current) {
      hasHandledWelcome.current = true

      if (params.has('new')) {
        toast.success('Account created — signed in!')
      } else {
        toast.success('Signed in successfully!')
      }

      params.delete('welcome')
      params.delete('new')
      const newSearch = params.toString()
      navigate(
        { pathname: location.pathname, search: newSearch ? `?${newSearch}` : '' },
        { replace: true }
      )
    }
  }, [location.search, location.pathname, navigate])

  return (
    <>
      <Toaster />
      {!hideNavbar && <Navbar />}
      <Router />
    </>
  )
}

export default App