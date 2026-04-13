export interface UserProfile {
  id: string;
  username: string;
  full_name: string;
  avatar_url?: string;
  bike_make?: string;
  bike_model?: string;
  bike_year?: number;
  location_sharing: boolean;
  created_at: string;
}

export interface Ride {
  id: string;
  title: string;
  description?: string;
  organizer_id: string;
  organizer?: UserProfile;
  start_location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  end_location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  waypoints?: Array<{
    latitude: number;
    longitude: number;
  }>;
  scheduled_at: string;
  is_crew_ride: boolean;
  max_participants?: number;
  participant_count: number;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  organizer_id: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
    name?: string;
  };
  scheduled_at: string;
  end_at?: string;
  event_type: 'meetup' | 'rally' | 'race' | 'charity' | 'other';
  attendee_count: number;
  max_attendees?: number;
  created_at: string;
}

export interface MapPin {
  id: string;
  type: 'user' | 'crew_ride' | 'event';
  latitude: number;
  longitude: number;
  title: string;
  data?: Ride | Event;
}

export interface NearbyRider {
  id: string;
  username: string;
  distance_km: number;
  last_seen: string;
}

export interface SafetyAlert {
  id: string;
  alert_type: 'hazard' | 'accident' | 'weather' | 'police';
  location: {
    latitude: number;
    longitude: number;
  };
  description?: string;
  reported_by: string;
  created_at: string;
  expires_at?: string;
}
