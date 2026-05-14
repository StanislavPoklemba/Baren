import { Resend } from 'resend'
import 'dotenv/config'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const FROM_EMAIL  = process.env.FROM_EMAIL ?? 'onboarding@resend.dev'

const ROOM_NAMES = {
  standard: 'Standard Double Room',
  superior: 'Superior Double Room',
  deluxe:   'Deluxe Double Room',
  suite:    'Junior Suite',
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function tableRow(label, value) {
  return `<tr>
    <td style="padding:9px 12px;border-bottom:1px solid #eee;color:#888;width:38%;font-size:13px">${label}</td>
    <td style="padding:9px 12px;border-bottom:1px solid #eee;font-size:13px">${value}</td>
  </tr>`
}

function emailWrapper(bodyHtml) {
  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f5f1eb;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #e0d9ce">
        <tr><td style="padding:6px 0;background:#1a1207;text-align:center">
          <span style="color:#b5933a;font-family:Georgia,serif;font-size:11px;letter-spacing:4px;text-transform:uppercase">Zum Schwarzen Bären</span>
        </td></tr>
        <tr><td style="padding:40px">
          ${bodyHtml}
          <p style="margin-top:32px;font-size:11px;color:#bbb;border-top:1px solid #eee;padding-top:20px">
            Hotel &amp; Restaurant zum Schwarzen Bären · Gotthardstrasse 56 · 6490 Andermatt<br>
            <a href="mailto:Info@baeren-andermatt.ch" style="color:#b5933a">Info@baeren-andermatt.ch</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}

export async function sendHotelEmails({ guestName, guestEmail, roomType, checkIn, checkOut, numGuests, adults, kids, kidAges, hasInfant, specialRequests, reservationId }) {
  if (!resend) {
    console.warn('RESEND_API_KEY not set — skipping email for reservation', reservationId)
    return
  }

  const room        = ROOM_NAMES[roomType] ?? roomType
  const checkInFmt  = formatDate(checkIn)
  const checkOutFmt = formatDate(checkOut)

  // Build guest summary — e.g. "2 adults, 3 children (5, 10, 14 yrs)"
  const effectiveAdults = adults ?? numGuests
  const effectiveKids   = kids   ?? 0
  const effectiveAges   = Array.isArray(kidAges) ? kidAges : []

  let guestSummary = `${effectiveAdults} adult${effectiveAdults !== 1 ? 's' : ''}`
  if (effectiveKids > 0) {
    const ageList = effectiveAges.length > 0
      ? ` (${effectiveAges.map(a => `${a} yr${a !== 1 ? 's' : ''}`).join(', ')})`
      : ''
    guestSummary += `, ${effectiveKids} child${effectiveKids !== 1 ? 'ren' : ''}${ageList}`
  }
  if (hasInfant) guestSummary += ' — crib will be prepared'

  const adminBody = `
    <h2 style="font-family:Georgia,serif;font-weight:normal;color:#1a1a1a;margin-top:0">New Hotel Reservation</h2>
    <div style="width:36px;height:1px;background:#b5933a;margin:12px 0 24px"></div>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
      ${tableRow('Reservation ID', `<code style="font-size:11px;color:#888">${reservationId}</code>`)}
      ${tableRow('Guest', guestName)}
      ${tableRow('Email', `<a href="mailto:${guestEmail}" style="color:#b5933a">${guestEmail}</a>`)}
      ${tableRow('Room Type', room)}
      ${tableRow('Check-in', `${checkInFmt} &nbsp;·&nbsp; from 15:00`)}
      ${tableRow('Check-out', `${checkOutFmt} &nbsp;·&nbsp; by 11:00`)}
      ${tableRow('Guests', guestSummary)}
      ${tableRow('Special requests', specialRequests || '—')}
    </table>
    <p style="margin-top:20px;padding:14px;background:#fdf9f4;border-left:3px solid #b5933a;font-size:13px;color:#555">
      <strong>Payment:</strong> To be collected at the hotel upon arrival.
    </p>`

  const guestBody = `
    <h2 style="font-family:Georgia,serif;font-weight:normal;color:#1a1a1a;margin-top:0">Reservation Confirmed</h2>
    <div style="width:36px;height:1px;background:#b5933a;margin:12px 0 24px"></div>
    <p style="color:#555;line-height:1.7;font-size:14px">Dear ${guestName},</p>
    <p style="color:#555;line-height:1.7;font-size:14px">
      We are delighted to confirm your stay at <strong>Hotel zum Schwarzen Bären</strong>.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:20px 0">
      ${tableRow('Room', room)}
      ${tableRow('Check-in', `${checkInFmt} &nbsp;·&nbsp; from 15:00`)}
      ${tableRow('Check-out', `${checkOutFmt} &nbsp;·&nbsp; by 11:00`)}
      ${tableRow('Guests', guestSummary)}
      ${specialRequests ? tableRow('Special requests', specialRequests) : ''}
    </table>
    <p style="margin-top:20px;padding:14px;background:#fdf9f4;border-left:3px solid #b5933a;font-size:13px;color:#555">
      <strong>Payment</strong> is to be made at the hotel upon arrival. We accept cash and major credit cards.
    </p>
    <p style="color:#555;line-height:1.7;font-size:14px;margin-top:24px">
      We look forward to welcoming you,<br>
      <em>The Bären Team</em>
    </p>`

  await Promise.all([
    resend.emails.send({
      from:    FROM_EMAIL,
      to:      ADMIN_EMAIL,
      subject: `New Hotel Reservation — ${room} — Check-in: ${checkInFmt}`,
      html:    emailWrapper(adminBody),
    }),
    resend.emails.send({
      from:    FROM_EMAIL,
      to:      guestEmail,
      subject: 'Reservation Confirmed — Zum Schwarzen Bären',
      html:    emailWrapper(guestBody),
    }),
  ])
}

export async function sendRestaurantEmails({ guestName, guestEmail, date, timeSlot, numGuests, specialRequests, reservationId }) {
  if (!resend) {
    console.warn('RESEND_API_KEY not set — skipping email for reservation', reservationId)
    return
  }

  const dateFmt = formatDate(date)

  const adminBody = `
    <h2 style="font-family:Georgia,serif;font-weight:normal;color:#1a1a1a;margin-top:0">New Restaurant Reservation</h2>
    <div style="width:36px;height:1px;background:#b5933a;margin:12px 0 24px"></div>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
      ${tableRow('Reservation ID', `<code style="font-size:11px;color:#888">${reservationId}</code>`)}
      ${tableRow('Guest', guestName)}
      ${tableRow('Email', `<a href="mailto:${guestEmail}" style="color:#b5933a">${guestEmail}</a>`)}
      ${tableRow('Date', dateFmt)}
      ${tableRow('Time', timeSlot)}
      ${tableRow('Guests', numGuests)}
      ${tableRow('Special requests', specialRequests || '—')}
    </table>`

  const guestBody = `
    <h2 style="font-family:Georgia,serif;font-weight:normal;color:#1a1a1a;margin-top:0">Table Reserved</h2>
    <div style="width:36px;height:1px;background:#b5933a;margin:12px 0 24px"></div>
    <p style="color:#555;line-height:1.7;font-size:14px">Dear ${guestName},</p>
    <p style="color:#555;line-height:1.7;font-size:14px">
      Your table at <strong>Restaurant zum Schwarzen Bären</strong> has been confirmed.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:20px 0">
      ${tableRow('Date', dateFmt)}
      ${tableRow('Time', timeSlot)}
      ${tableRow('Guests', numGuests)}
      ${specialRequests ? tableRow('Special requests', specialRequests) : ''}
    </table>
    <p style="font-size:13px;color:#888">Kitchen open 18:00 – 21:00 · Wednesday to Sunday.</p>
    <p style="color:#555;line-height:1.7;font-size:14px;margin-top:24px">
      We look forward to seeing you,<br>
      <em>The Bären Team</em>
    </p>`

  await Promise.all([
    resend.emails.send({
      from:    FROM_EMAIL,
      to:      ADMIN_EMAIL,
      subject: `New Restaurant Reservation — ${dateFmt} at ${timeSlot}`,
      html:    emailWrapper(adminBody),
    }),
    resend.emails.send({
      from:    FROM_EMAIL,
      to:      guestEmail,
      subject: 'Table Reservation Confirmed — Zum Schwarzen Bären',
      html:    emailWrapper(guestBody),
    }),
  ])
}
