import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar          from './components/Navbar'
import Footer          from './components/Footer'
import HomePage        from './pages/HomePage'
import HotelPage       from './pages/HotelPage'
import RoomsPage       from './pages/RoomsPage'
import RestaurantPage  from './pages/RestaurantPage'
import ReservationPage from './pages/ReservationPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function App() {
  return (
    <div className="min-h-screen bg-alabaster text-charcoal antialiased">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/hotel"       element={<HotelPage />} />
        <Route path="/rooms"       element={<RoomsPage />} />
        <Route path="/restaurant"  element={<RestaurantPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
