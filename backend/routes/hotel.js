import { Router } from 'express'
import supabase from '../services/db.js'
import { sendHotelEmails } from '../services/email.js'

const router = Router()

const ROOM_CONFIG = {
  standard: { units: 2, maxGuests: 2 },
  superior: { units: 1, maxGuests: 4 },
  deluxe:   { units: 1, maxGuests: 4 },
  suite:    { units: 1, maxGuests: 4 },
}

router.post('/', async (req, res) => {
  const { roomType, guestName, guestEmail, checkIn, checkOut, numGuests, adults, kids, kidAges, hasInfant, specialRequests } = req.body

  if (!roomType || !guestName || !guestEmail || !checkIn || !checkOut || !numGuests) {
    return res.status(400).json({ error: 'Missing required fields.' })
  }

  const config = ROOM_CONFIG[roomType]
  if (!config) {
    return res.status(400).json({ error: 'Invalid room type.' })
  }

  if (numGuests > config.maxGuests) {
    return res.status(400).json({ error: `This room type accepts a maximum of ${config.maxGuests} guests.` })
  }

  const checkInDate  = new Date(checkIn  + 'T00:00:00')
  const checkOutDate = new Date(checkOut + 'T00:00:00')
  const today        = new Date(); today.setHours(0, 0, 0, 0)

  if (checkInDate < today) {
    return res.status(400).json({ error: 'Check-in date cannot be in the past.' })
  }
  if (checkOutDate <= checkInDate) {
    return res.status(400).json({ error: 'Check-out must be after check-in.' })
  }

  // Find all occupied units for this room type in the requested date range
  // Overlap condition: existing.check_in < requested.check_out AND existing.check_out > requested.check_in
  const { data: occupied, error: queryError } = await supabase
    .from('hotel_reservations')
    .select('room_unit')
    .eq('room_type', roomType)
    .eq('status', 'confirmed')
    .lt('check_in', checkOut)
    .gt('check_out', checkIn)

  if (queryError) {
    console.error('DB query error:', queryError)
    return res.status(500).json({ error: 'Database error. Please try again.' })
  }

  const occupiedUnits = new Set(occupied.map((r) => r.room_unit))
  let availableUnit = null
  for (let unit = 1; unit <= config.units; unit++) {
    if (!occupiedUnits.has(unit)) { availableUnit = unit; break }
  }

  if (!availableUnit) {
    return res.status(409).json({ error: 'No rooms of this type are available for the selected dates. Please choose different dates or a different room type.' })
  }

  const { data: reservation, error: insertError } = await supabase
    .from('hotel_reservations')
    .insert({
      room_type:        roomType,
      room_unit:        availableUnit,
      guest_name:       guestName,
      guest_email:      guestEmail,
      check_in:         checkIn,
      check_out:        checkOut,
      num_guests:       numGuests,
      has_infant:       hasInfant ?? false,
      special_requests: specialRequests ?? null,
    })
    .select('id')
    .single()

  if (insertError) {
    console.error('DB insert error:', insertError)
    return res.status(500).json({ error: 'Failed to save reservation. Please try again.' })
  }

  try {
    await sendHotelEmails({ guestName, guestEmail, roomType, checkIn, checkOut, numGuests, adults, kids, kidAges, hasInfant: hasInfant ?? false, specialRequests, reservationId: reservation.id })
  } catch (emailErr) {
    console.error('Email error (reservation saved):', emailErr)
  }

  res.status(201).json({ success: true, reservationId: reservation.id })
})

export default router
