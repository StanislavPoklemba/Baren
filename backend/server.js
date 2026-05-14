import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import hotelRouter      from './routes/hotel.js'
import restaurantRouter from './routes/restaurant.js'

const app          = express()
const PORT         = process.env.PORT         ?? 3001
const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:5173'

app.use(cors({ origin: FRONTEND_URL }))
app.use(express.json())

app.use('/api/hotel',      hotelRouter)
app.use('/api/restaurant', restaurantRouter)

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => console.log(`Backend running → http://localhost:${PORT}`))
