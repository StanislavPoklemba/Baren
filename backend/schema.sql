-- ============================================================
-- Bären Hotel & Restaurant — Supabase schema
-- Run this once in: Supabase → SQL Editor → New Query
-- ============================================================

CREATE TABLE IF NOT EXISTS hotel_reservations (
  id               UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  room_type        VARCHAR(20)  NOT NULL CHECK (room_type IN ('standard', 'superior', 'deluxe', 'suite')),
  room_unit        SMALLINT     NOT NULL DEFAULT 1,
  guest_name       VARCHAR(255) NOT NULL,
  guest_email      VARCHAR(255) NOT NULL,
  check_in         DATE         NOT NULL,
  check_out        DATE         NOT NULL,
  num_guests       SMALLINT     NOT NULL,
  has_infant       BOOLEAN      DEFAULT FALSE,
  special_requests TEXT,
  status           VARCHAR(20)  DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled')),
  created_at       TIMESTAMPTZ  DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS restaurant_reservations (
  id               UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name       VARCHAR(255) NOT NULL,
  guest_email      VARCHAR(255) NOT NULL,
  reservation_date DATE         NOT NULL,
  time_slot        TIME         NOT NULL,
  num_guests       SMALLINT     NOT NULL CHECK (num_guests >= 1 AND num_guests <= 10),
  special_requests TEXT,
  status           VARCHAR(20)  DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled')),
  created_at       TIMESTAMPTZ  DEFAULT NOW()
);

-- Indexes for faster availability queries
CREATE INDEX IF NOT EXISTS idx_hotel_room_dates
  ON hotel_reservations(room_type, room_unit, check_in, check_out)
  WHERE status = 'confirmed';

CREATE INDEX IF NOT EXISTS idx_restaurant_date_slot
  ON restaurant_reservations(reservation_date, time_slot)
  WHERE status = 'confirmed';

-- Enable Row Level Security (backend uses service key which bypasses RLS)
ALTER TABLE hotel_reservations      ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_reservations ENABLE ROW LEVEL SECURITY;
