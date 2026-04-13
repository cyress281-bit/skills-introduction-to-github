import { Ride, Event, MapPin, NearbyRider } from '../types';

// Mock user location (Los Angeles area)
export const MOCK_USER_LOCATION = {
  latitude: 34.0522,
  longitude: -118.2437,
};

export const mockCrewRides: Ride[] = [
  {
    id: 'ride-1',
    title: 'Sunday Canyon Run',
    description: 'Scenic ride through Malibu Canyon to the coast.',
    organizer_id: 'user-2',
    start_location: {
      latitude: 34.0456,
      longitude: -118.3123,
      address: 'Calabasas, CA',
    },
    end_location: {
      latitude: 34.0259,
      longitude: -118.7798,
      address: 'Malibu, CA',
    },
    scheduled_at: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    is_crew_ride: true,
    participant_count: 8,
    max_participants: 15,
    status: 'upcoming',
    created_at: new Date().toISOString(),
  },
  {
    id: 'ride-2',
    title: 'PCH Blast - Sunset Ride',
    description: 'Pacific Coast Highway sunset cruise.',
    organizer_id: 'user-3',
    start_location: {
      latitude: 34.0195,
      longitude: -118.4912,
      address: 'Santa Monica, CA',
    },
    scheduled_at: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
    is_crew_ride: true,
    participant_count: 12,
    status: 'upcoming',
    created_at: new Date().toISOString(),
  },
  {
    id: 'ride-3',
    title: 'Early Morning Canyons',
    description: 'Mulholland at sunrise - cool air, no traffic.',
    organizer_id: 'user-4',
    start_location: {
      latitude: 34.0785,
      longitude: -118.4023,
      address: 'Mulholland Dr, LA',
    },
    scheduled_at: new Date(Date.now() + 14 * 60 * 60 * 1000).toISOString(),
    is_crew_ride: true,
    participant_count: 5,
    max_participants: 10,
    status: 'upcoming',
    created_at: new Date().toISOString(),
  },
];

export const mockEvents: Event[] = [
  {
    id: 'event-1',
    title: 'SoCal Moto Meetup',
    description: 'Monthly SoCal motorcycle community gathering.',
    organizer_id: 'user-5',
    location: {
      latitude: 34.0672,
      longitude: -118.3005,
      address: 'The Lot, West Hollywood',
      name: 'The Lot',
    },
    scheduled_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    event_type: 'meetup',
    attendee_count: 47,
    max_attendees: 100,
    created_at: new Date().toISOString(),
  },
  {
    id: 'event-2',
    title: 'Long Beach Bike Show',
    description: 'Annual custom motorcycle and culture show.',
    organizer_id: 'user-6',
    location: {
      latitude: 33.7701,
      longitude: -118.1937,
      address: 'Long Beach Convention Center',
      name: 'Long Beach Convention Center',
    },
    scheduled_at: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    event_type: 'rally',
    attendee_count: 230,
    created_at: new Date().toISOString(),
  },
  {
    id: 'event-3',
    title: 'Charity Toy Run',
    description: "Annual toy drive for local children's hospital.",
    organizer_id: 'user-7',
    location: {
      latitude: 34.1478,
      longitude: -118.1445,
      address: 'Pasadena Rose Bowl',
      name: 'Rose Bowl',
    },
    scheduled_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    event_type: 'charity',
    attendee_count: 89,
    created_at: new Date().toISOString(),
  },
];

// Combine crew rides and events into map pins
export const mockMapPins: MapPin[] = [
  // Current user pin
  {
    id: 'current-user',
    type: 'user',
    latitude: MOCK_USER_LOCATION.latitude,
    longitude: MOCK_USER_LOCATION.longitude,
    title: 'You',
  },
  // Crew ride pins
  ...mockCrewRides.map((ride) => ({
    id: `pin-${ride.id}`,
    type: 'crew_ride' as const,
    latitude: ride.start_location.latitude,
    longitude: ride.start_location.longitude,
    title: ride.title,
    data: ride,
  })),
  // Event pins
  ...mockEvents.map((event) => ({
    id: `pin-${event.id}`,
    type: 'event' as const,
    latitude: event.location.latitude,
    longitude: event.location.longitude,
    title: event.title,
    data: event,
  })),
];

export const mockNearbyRiders: NearbyRider[] = [
  { id: 'rider-1', username: 'throttle_king', distance_km: 0.8, last_seen: new Date().toISOString() },
  { id: 'rider-2', username: 'moto_mama', distance_km: 1.2, last_seen: new Date(Date.now() - 2 * 60000).toISOString() },
  { id: 'rider-3', username: 'canyon_carver', distance_km: 2.1, last_seen: new Date(Date.now() - 5 * 60000).toISOString() },
  { id: 'rider-4', username: 'ironhorse88', distance_km: 3.4, last_seen: new Date(Date.now() - 8 * 60000).toISOString() },
  { id: 'rider-5', username: 'roadwarrior_r', distance_km: 4.7, last_seen: new Date(Date.now() - 12 * 60000).toISOString() },
  { id: 'rider-6', username: 'twisties_only', distance_km: 6.3, last_seen: new Date(Date.now() - 20 * 60000).toISOString() },
  { id: 'rider-7', username: 'ducati_dave', distance_km: 7.1, last_seen: new Date(Date.now() - 25 * 60000).toISOString() },
  { id: 'rider-8', username: 'nightrider_x', distance_km: 9.2, last_seen: new Date(Date.now() - 30 * 60000).toISOString() },
  { id: 'rider-9', username: 'biker_bella', distance_km: 11.5, last_seen: new Date(Date.now() - 45 * 60000).toISOString() },
  { id: 'rider-10', username: 'rev_ranger', distance_km: 14.8, last_seen: new Date(Date.now() - 60 * 60000).toISOString() },
];
