import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import FadeIn from './FadeIn'
import { useLanguage } from '../context/LanguageContext'
import ROOMS from '../data/rooms.json'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

const ROOM_MAX_GUESTS = { standard: 2, superior: 4, deluxe: 4, suite: 4 }

const TIME_SLOTS = [
  '18:00','18:15','18:30','18:45',
  '19:00','19:15','19:30','19:45',
  '20:00','20:15','20:30','20:45',
  '21:00',
]

function isClosedDay(dateStr) {
  if (!dateStr) return false
  const day = new Date(dateStr + 'T00:00:00').getDay()
  return day === 1 || day === 2
}

function todayStr() {
  return new Date().toISOString().split('T')[0]
}

function nextDayStr(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

const INITIAL_FORM = {
  type:     'table',
  name:     '',
  email:    '',
  requests: '',
  // table
  date:     '',
  time:     '',
  guests:   '2',
  // room
  roomType: 'standard',
  checkIn:  '',
  checkOut: '',
  adults:   1,
  kids:     0,
  kidAges:  [],
}

function StepCounter({ value, onDecrement, onIncrement, minReached, maxReached }) {
  const btnCls = 'w-7 h-7 border border-muted flex items-center justify-center text-graphite hover:border-gold-dark disabled:opacity-30 transition-colors duration-300'
  return (
    <div className="flex items-center gap-3">
      <button type="button" onClick={onDecrement} disabled={minReached} className={btnCls}>–</button>
      <span className="w-6 text-center text-sm text-charcoal">{value}</span>
      <button type="button" onClick={onIncrement} disabled={maxReached} className={btnCls}>+</button>
    </div>
  )
}

export default function Reservation() {
  const { lang, t } = useLanguage()
  const c = t.contact

  const [form, setForm]               = useState(INITIAL_FORM)
  const [status, setStatus]           = useState('idle')
  const [errorMsg, setError]          = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const maxGuests = ROOM_MAX_GUESTS[form.roomType] ?? 4

  const validate = () => {
    const missing = []
    const errors  = {}
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)

    if (!form.name.trim())  { missing.push(c.name);  errors.name  = true }
    if (!form.email.trim()) { missing.push(c.email);  errors.email = true }
    else if (!emailOk)      { missing.push(c.validationEmail); errors.email = true }

    if (form.type === 'table') {
      if (!form.date) { missing.push(c.date); errors.date = true }
      else if (isClosedDay(form.date)) { missing.push(c.dateClosedError); errors.date = true }
      if (!form.time) { missing.push(c.time); errors.time = true }
    } else {
      if (!form.checkIn)  { missing.push(c.checkIn);  errors.checkIn  = true }
      if (!form.checkOut) { missing.push(c.checkOut); errors.checkOut = true }
      if (form.kids > 0) {
        form.kidAges.forEach((a, i) => {
          if (a === '') {
            missing.push(`${c.kidAgeOf} ${i + 1} ${c.kidAgeRequired}`)
            errors.kidAges = true
          }
        })
      }
    }

    return { missing, errors }
  }

  const dateToStr = (date) => {
    if (!date) return ''
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }

  const handleDateChange = (date) => {
    setFieldErrors((prev) => ({ ...prev, date: false }))
    setForm((prev) => ({ ...prev, date: dateToStr(date) }))
  }

  const handleCheckInChange = (date) => {
    setFieldErrors((prev) => ({ ...prev, checkIn: false }))
    setForm((prev) => {
      const str = dateToStr(date)
      const next = { ...prev, checkIn: str }
      if (prev.checkOut && prev.checkOut <= str) next.checkOut = ''
      return next
    })
  }

  const handleCheckOutChange = (date) => {
    setFieldErrors((prev) => ({ ...prev, checkOut: false }))
    setForm((prev) => ({ ...prev, checkOut: dateToStr(date) }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFieldErrors((prev) => ({ ...prev, [name]: false }))
    setForm((prev) => {
      const next = { ...prev, [name]: value }
      if (name === 'roomType') {
        const newMax = ROOM_MAX_GUESTS[value] ?? 4
        if (prev.adults + prev.kids > newMax) {
          const newAdults = Math.max(1, newMax - prev.kids)
          const newKids   = Math.min(prev.kids, newMax - newAdults)
          next.adults  = newAdults
          next.kids    = newKids
          next.kidAges = prev.kidAges.slice(0, newKids)
        }
      }
      return next
    })
  }

  const handleAdults = (delta) => {
    setForm((prev) => ({
      ...prev,
      adults: Math.max(1, Math.min(ROOM_MAX_GUESTS[prev.roomType] ?? 4 - prev.kids, prev.adults + delta)),
    }))
  }

  const handleKids = (delta) => {
    setForm((prev) => {
      const max     = ROOM_MAX_GUESTS[prev.roomType] ?? 4
      const newKids = Math.max(0, Math.min(max - prev.adults, prev.kids + delta))
      const ages    = prev.kidAges.slice(0, newKids)
      while (ages.length < newKids) ages.push('')
      return { ...prev, kids: newKids, kidAges: ages }
    })
    setFieldErrors((prev) => ({ ...prev, kidAges: false }))
  }

  const handleKidAge = (index, value) => {
    setForm((prev) => {
      const ages = [...prev.kidAges]
      ages[index] = value
      return { ...prev, kidAges: ages }
    })
    setFieldErrors((prev) => ({ ...prev, kidAges: false }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { missing, errors } = validate()
    if (missing.length > 0) {
      setFieldErrors(errors)
      setError(`${c.validationPrefix} ${missing.join(', ')}.`)
      setStatus('error')
      return
    }
    setFieldErrors({})
    setStatus('loading')
    setError('')

    try {
      let response

      if (form.type === 'table') {
        response = await fetch(`${API_URL}/api/restaurant`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            guestName:       form.name,
            guestEmail:      form.email,
            date:            form.date,
            timeSlot:        form.time,
            numGuests:       parseInt(form.guests),
            specialRequests: form.requests,
          }),
        })
      } else {
        response = await fetch(`${API_URL}/api/hotel`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            roomType:        form.roomType,
            guestName:       form.name,
            guestEmail:      form.email,
            checkIn:         form.checkIn,
            checkOut:        form.checkOut,
            numGuests:       form.adults + form.kids,
            adults:          form.adults,
            kids:            form.kids,
            kidAges:         form.kidAges.map(Number),
            hasInfant:       form.kidAges.some((a) => Number(a) < 2),
            specialRequests: form.requests,
          }),
        })
      }

      const data = await response.json()
      if (!response.ok) {
        setError(data.error ?? c.errorGeneral)
        setStatus('error')
        return
      }

      setStatus('success')
    } catch {
      setError(c.errorConnection)
      setStatus('error')
    }
  }

  const closeModal = () => {
    setStatus('idle')
    setForm(INITIAL_FORM)
    setFieldErrors({})
  }

  const today       = todayStr()
  const minCheckOut = form.checkIn ? nextDayStr(form.checkIn) : today

  const getRoomName = (room) => {
    const key = `name${lang.charAt(0).toUpperCase() + lang.slice(1)}`
    return room[key] ?? room.nameEn
  }

  const inputClass = 'bg-transparent border-b py-3 text-charcoal placeholder-muted/60 focus:outline-none transition-colors duration-500'
  const labelClass = 'text-[10px] uppercase tracking-wide-3 text-graphite mb-3'
  const fieldCls   = (key) => `${inputClass} ${fieldErrors[key] ? 'border-red-400 focus:border-red-400' : 'border-line focus:border-gold'}`

  return (
    <section
      id="contact"
      className="relative pt-14 pb-14 md:pt-20 md:pb-20 bg-pearl overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gold-line opacity-40"
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <FadeIn>
          <p className="eyebrow mb-6">{c.eyebrow}</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="section-title">
            {c.titleMain}{' '}
            <span className="italic text-gold-dark">{c.titleItalic}</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.25}>
          <div className="gold-divider mt-10" />
        </FadeIn>
        <FadeIn delay={0.35}>
          <p className="mt-8 text-graphite max-w-xl mx-auto leading-relaxed">
            {c.intro}
          </p>
        </FadeIn>

        <FadeIn delay={0.5}>
          <form
            onSubmit={handleSubmit}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
            noValidate
          >
            {/* ── Reservation type ── */}
            <div className="flex flex-col md:col-span-2">
              <label className={labelClass}>{c.type}</label>
              <div className="flex gap-6">
                {[
                  { value: 'table', label: c.typeTable },
                  { value: 'room',  label: c.typeRoom  },
                ].map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="type"
                      value={opt.value}
                      checked={form.type === opt.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span
                      className={[
                        'block w-3.5 h-3.5 rounded-full border transition-colors duration-300',
                        form.type === opt.value
                          ? 'border-gold bg-gold'
                          : 'border-muted group-hover:border-gold-dark',
                      ].join(' ')}
                    />
                    <span className="text-sm text-charcoal">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* ── Full name ── */}
            <div className="flex flex-col md:col-span-2">
              <label htmlFor="name" className={labelClass}>{c.name}</label>
              <input
                id="name" name="name" type="text" required
                placeholder={c.namePlaceholder}
                value={form.name}
                onChange={handleChange}
                className={fieldCls('name')}
              />
            </div>

            {/* ════ ROOM BOOKING ════ */}
            {form.type === 'room' && (
              <>
                {/* Room type */}
                <div className="flex flex-col md:col-span-2">
                  <label htmlFor="roomType" className={labelClass}>{c.roomType}</label>
                  <select
                    id="roomType" name="roomType"
                    value={form.roomType}
                    onChange={handleChange}
                    className={fieldCls('roomType') + ' appearance-none'}
                  >
                    {ROOMS.map((room) => (
                      <option key={room.id} value={room.id}>
                        {getRoomName(room)} ({c.maxGuests}: {ROOM_MAX_GUESTS[room.id]})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Check-in */}
                <div className="flex flex-col">
                  <label htmlFor="checkIn" className={labelClass}>{c.checkIn}</label>
                  <DatePicker
                    id="checkIn"
                    selected={form.checkIn ? new Date(form.checkIn + 'T00:00:00') : null}
                    onChange={handleCheckInChange}
                    minDate={new Date(today + 'T00:00:00')}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/mm/yyyy"
                    autoComplete="off"
                    className={fieldCls('checkIn')}
                    wrapperClassName="w-full"
                  />
                </div>

                {/* Check-out */}
                <div className="flex flex-col">
                  <label htmlFor="checkOut" className={labelClass}>{c.checkOut}</label>
                  <DatePicker
                    id="checkOut"
                    selected={form.checkOut ? new Date(form.checkOut + 'T00:00:00') : null}
                    onChange={handleCheckOutChange}
                    minDate={new Date(minCheckOut + 'T00:00:00')}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/mm/yyyy"
                    autoComplete="off"
                    className={fieldCls('checkOut')}
                    wrapperClassName="w-full"
                  />
                </div>

                {/* Adults counter */}
                <div className="flex flex-col gap-3">
                  <label className={labelClass}>{c.adults}</label>
                  <StepCounter
                    value={form.adults}
                    onDecrement={() => handleAdults(-1)}
                    onIncrement={() => handleAdults(1)}
                    minReached={form.adults <= 1}
                    maxReached={form.adults + form.kids >= maxGuests}
                  />
                </div>

                {/* Kids counter + age inputs */}
                <div className="flex flex-col gap-3">
                  <label className={labelClass}>{c.kids}</label>
                  <div className="flex flex-col gap-4">
                    <StepCounter
                      value={form.kids}
                      onDecrement={() => handleKids(-1)}
                      onIncrement={() => handleKids(1)}
                      minReached={form.kids <= 0}
                      maxReached={form.adults + form.kids >= maxGuests}
                    />
                    {form.kidAges.map((age, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <label className={labelClass + ' w-4 mb-0'}>{i + 1}.</label>
                        <select
                          value={age}
                          onChange={(e) => handleKidAge(i, e.target.value)}
                          className={fieldCls('kidAges') + ' appearance-none w-32'}
                        >
                          <option value="" disabled>{c.kidAgeSelectPlaceholder}</option>
                          {Array.from({ length: 18 }, (_, n) => (
                            <option key={n} value={n}>
                              {n} {n === 1 ? c.kidAgeYear : c.kidAgeYears}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col md:col-span-2">
                  <label htmlFor="emailRoom" className={labelClass}>{c.email}</label>
                  <input
                    id="emailRoom" name="email" type="email" required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className={fieldCls('email')}
                  />
                </div>
              </>
            )}

            {/* ════ TABLE RESERVATION ════ */}
            {form.type === 'table' && (
              <>
                {/* Date */}
                <div className="flex flex-col">
                  <label htmlFor="date" className={labelClass}>{c.date}</label>
                  <DatePicker
                    id="date"
                    selected={form.date ? new Date(form.date + 'T00:00:00') : null}
                    onChange={handleDateChange}
                    filterDate={(d) => d.getDay() !== 1 && d.getDay() !== 2}
                    minDate={new Date(today + 'T00:00:00')}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/mm/yyyy"
                    autoComplete="off"
                    className={fieldCls('date')}
                    wrapperClassName="w-full"
                  />
                </div>

                {/* Time */}
                <div className="flex flex-col">
                  <label htmlFor="time" className={labelClass}>{c.time}</label>
                  <select
                    id="time" name="time" required
                    value={form.time}
                    onChange={handleChange}
                    className={fieldCls('time') + ' appearance-none'}
                  >
                    <option value="" disabled>{c.timeSelect}</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                {/* Guests */}
                <div className="flex flex-col">
                  <label htmlFor="guests" className={labelClass}>{c.guests}</label>
                  <select
                    id="guests" name="guests" required
                    value={form.guests}
                    onChange={handleChange}
                    className={fieldCls('guests') + ' appearance-none'}
                  >
                    {[1,2,3,4,5,6].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? c.guestSingular : c.guestPlural}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label htmlFor="emailTable" className={labelClass}>{c.email}</label>
                  <input
                    id="emailTable" name="email" type="email" required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className={fieldCls('email')}
                  />
                </div>
              </>
            )}

            {/* ── Special requests ── */}
            <div className="flex flex-col md:col-span-2">
              <label htmlFor="requests" className={labelClass}>{c.requests}</label>
              <textarea
                id="requests" name="requests" rows="3"
                value={form.requests}
                onChange={handleChange}
                placeholder={c.requestsPlaceholder}
                className={inputClass + ' resize-none'}
              />
            </div>

            {/* ── Error message ── */}
            {status === 'error' && (
              <div className="md:col-span-2 text-center">
                <p className="text-sm text-red-600 font-light">{errorMsg}</p>
              </div>
            )}

            {/* ── Submit ── */}
            <div className="md:col-span-2 flex justify-center mt-6">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="group relative px-14 py-4 border border-gold text-gold-dark text-[10px] uppercase tracking-wide-4 overflow-hidden transition-colors duration-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 group-hover:text-alabaster transition-colors duration-700">
                  {status === 'loading' ? c.submitting : c.cta}
                </span>
                <span
                  className="absolute inset-0 bg-gold scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-silk"
                  aria-hidden="true"
                />
              </button>
            </div>
          </form>
        </FadeIn>

        <FadeIn delay={0.65}>
          <p className="mt-16 text-[11px] uppercase tracking-wide-3 text-graphite leading-relaxed">
            {c.groupInfo}{' '}
            <a
              href="mailto:Info@baeren-andermatt.ch"
              className="text-gold-dark hover:text-gold transition-colors duration-500"
            >
              Info@baeren-andermatt.ch
            </a>
          </p>
        </FadeIn>
      </div>

      {/* ── Success modal ── */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            key="confirm-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] bg-charcoal/30 backdrop-blur-sm flex items-center justify-center px-6"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="bg-alabaster border border-gold/40 max-w-md w-full p-12 text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="eyebrow mb-6">{c.modalEyebrow}</p>
              <h3 className="font-serif text-3xl text-charcoal">{c.modalTitle}</h3>
              <div className="gold-divider my-8" />
              <p className="text-graphite leading-relaxed">{c.modalText}</p>
              <button
                type="button"
                onClick={closeModal}
                className="mt-10 text-[11px] uppercase tracking-wide-3 text-gold-dark hover:text-gold transition-colors duration-500 border-b border-gold pb-1"
              >
                {c.modalClose}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
