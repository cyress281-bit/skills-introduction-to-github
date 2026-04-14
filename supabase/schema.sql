-- Ride Radar Database Schema
-- Run this in your Supabase SQL Editor

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PROFILES TABLE
-- Extends Supabase auth.users with rider-specific data
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bike_make TEXT,
  bike_model TEXT,
  bike_year INTEGER,
  location_sharing BOOLEAN DEFAULT TRUE,
  bio TEXT,
  total_rides INTEGER DEFAULT 0,
  total_miles DECIMAL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (TRUE);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- ============================================================
-- RIDES TABLE
-- Crew rides and solo ride tracking
-- ============================================================
CREATE TABLE IF NOT EXISTS public.rides (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  organizer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  start_location JSONB NOT NULL,
  end_location JSONB,
  waypoints JSONB DEFAULT '[]',
  scheduled_at TIMESTAMPTZ NOT NULL,
  is_crew_ride BOOLEAN DEFAULT TRUE,
  max_participants INTEGER,
  participant_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'active', 'completed', 'cancelled')),
  distance_km DECIMAL,
  duration_minutes INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.rides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Rides are viewable by everyone"
  ON public.rides FOR SELECT USING (TRUE);

CREATE POLICY "Authenticated users can create rides"
  ON public.rides FOR INSERT WITH CHECK (auth.uid() = organizer_id);

CREATE POLICY "Organizers can update their rides"
  ON public.rides FOR UPDATE USING (auth.uid() = organizer_id);

CREATE POLICY "Organizers can delete their rides"
  ON public.rides FOR DELETE USING (auth.uid() = organizer_id);

-- ============================================================
-- EVENTS TABLE
-- Motorcycle events, meetups, rallies, etc.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  organizer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  location JSONB NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ,
  event_type TEXT DEFAULT 'meetup' CHECK (event_type IN ('meetup', 'rally', 'race', 'charity', 'other')),
  attendee_count INTEGER DEFAULT 0,
  max_attendees INTEGER,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Events are viewable by everyone"
  ON public.events FOR SELECT USING (TRUE);

CREATE POLICY "Authenticated users can create events"
  ON public.events FOR INSERT WITH CHECK (auth.uid() = organizer_id);

CREATE POLICY "Organizers can update their events"
  ON public.events FOR UPDATE USING (auth.uid() = organizer_id);

-- ============================================================
-- RIDE PARTICIPANTS TABLE
-- Many-to-many relationship for crew ride membership
-- ============================================================
CREATE TABLE IF NOT EXISTS public.ride_participants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  ride_id UUID REFERENCES public.rides(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'going' CHECK (status IN ('going', 'maybe', 'not_going')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(ride_id, user_id)
);

ALTER TABLE public.ride_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ride participants are viewable by everyone"
  ON public.ride_participants FOR SELECT USING (TRUE);

CREATE POLICY "Authenticated users can join rides"
  ON public.ride_participants FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own participation"
  ON public.ride_participants FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can leave rides"
  ON public.ride_participants FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- SAFETY ALERTS TABLE
-- Road hazards, weather alerts, etc.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.safety_alerts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('hazard', 'accident', 'weather', 'police')),
  location JSONB NOT NULL,
  description TEXT,
  reported_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT TRUE,
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '2 hours')
);

ALTER TABLE public.safety_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active safety alerts are viewable by everyone"
  ON public.safety_alerts FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Authenticated users can report alerts"
  ON public.safety_alerts FOR INSERT WITH CHECK (auth.uid() = reported_by);

-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

-- Auto-update participant count when someone joins/leaves a ride
CREATE OR REPLACE FUNCTION update_ride_participant_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.rides SET participant_count = participant_count + 1 WHERE id = NEW.ride_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.rides SET participant_count = participant_count - 1 WHERE id = OLD.ride_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER ride_participant_count_trigger
  AFTER INSERT OR DELETE ON public.ride_participants
  FOR EACH ROW EXECUTE FUNCTION update_ride_participant_count();

-- Auto-create profile when user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'rider_' || LEFT(NEW.id::TEXT, 8)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Enable realtime for live rider tracking
ALTER PUBLICATION supabase_realtime ADD TABLE public.rides;
ALTER PUBLICATION supabase_realtime ADD TABLE public.safety_alerts;
