import { Router } from 'express'
import supabase from '../services/db.js'
import { sendRestaurantEmails } from '../services/email.js'

const router = Router()

const MAX_PER_SLOT    = 3
const MAX_GUESTS_DAY  = 25
const VALID_SLOTS     = new Set(['18:00','18:15','18:30','18:45','19:00','19:15','19:30','19:45','20:00','20:15','20:30','20:45','21:00'])

router.post('/', async (req, res) => {
  const { guestName, guestEmail, date, timeSlot, numGuests, specialRequests } = req.body

  if (!guestName || !guestEmail || !date || !timeSlot || !numGuests) {
    return res.status(400).json({ error: 'Missing required fields.' })
  }

  if (!VALID_SLOTS.has(timeSlot)) {
    return res.status(400).json({ error: 'Invalid time slot.' })
  }

  const reservationDate = new Date(date + 'T00:00:00')
  const today = new Date(); today.setHours(0, 0, 0, 0)
  if (reservationDate < today) {
    return res.status(400).json({ error: 'Reservation date cannot be in the past.' })
  }

  // Check: max 3 reservations per 15-min slot
  const { count: slotCount, error: slotErr } = await supabase
    .from('restaurant_reservations')
    .select('*', { count: 'exact', head: true })
    .eq('reservation_date', date)
    .eq('time_slot', timeSlot)
    .eq('status', 'confirmed')

  if (slotErr) {
    console.error('DB slot query error:', slotErr)
    return res.status(500).json({ error: 'Database error. Please try again.' })
  }

  if (slotCount >= MAX_PER_SLOT) {
    return res.status(409).json({ error: 'This time slot is fully booked. Please choose a different time.' })
  }

  // Check: max 25 guests per day
  const { data: dayData, error: dayErr } = await supabase
    .from('restaurant_reservations')
    .select('num_guests')
    .eq('reservation_date', date)
    .eq('status', 'confirmed')

  if (dayErr) {
    console.error('DB day query error:', dayErr)
    return res.status(500).json({ error: 'Database error. Please try again.' })
  }

  const currentGuests = dayData.reduce((sum, r) => sum + r.num_guests, 0)
  const remaining     = MAX_GUESTS_DAY - currentGuests

  if (remaining <= 0) {
    return res.status(409).json({ error: 'The restaurant is fully booked for this day. Please choose a different date.' })
  }
  if (numGuests > remaining) {
    return res.status(409).json({ error: `Only ${remaining} guest spot${remaining === 1 ? '' : 's'} remain for this day. Please reduce the number of guests or choose a different date.` })
  }

  const { data: reservation, error: insertError } = await supabase
    .from('restaurant_reservations')
    .insert({
      guest_name:       guestName,
      guest_email:      guestEmail,
      reservation_date: date,
      time_slot:        timeSlot,
      num_guests:       numGuests,
      special_requests: specialRequests ?? null,
    })
    .select('id')
    .single()

  if (insertError) {
    console.error('DB insert error:', insertError)
    return res.status(500).json({ error: 'Failed to save reservation. Please try again.' })
  }

  try {
    await sendRestaurantEmails({ guestName, guestEmail, date, timeSlot, numGuests, specialRequests, reservationId: reservation.id })
  } catch (emailErr) {
    console.error('Email error (reservation saved):', emailErr)
  }

  res.status(201).json({ success: true, reservationId: reservation.id })
})

export default router
