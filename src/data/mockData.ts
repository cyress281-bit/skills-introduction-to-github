import { MapPin } from '../types';

export const NEARBY_RIDER_COUNT = 10;

export const MAP_REGION = {
  latitude: 34.0522,
  longitude: -118.2437,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export const MOCK_PINS: MapPin[] = [
  {
    id: 'user-1',
    type: 'user',
    title: 'You',
    coordinate: { latitude: 34.0522, longitude: -118.2437 },
  },
  {
    id: 'crew-1',
    type: 'crew',
    title: 'Night Owls Crew',
    coordinate: { latitude: 34.0580, longitude: -118.2500 },
  },
  {
    id: 'crew-2',
    type: 'crew',
    title: 'Sunset Riders',
    coordinate: { latitude: 34.0470, longitude: -118.2350 },
  },
  {
    id: 'crew-3',
    type: 'crew',
    title: 'Downtown Pack',
    coordinate: { latitude: 34.0550, longitude: -118.2380 },
  },
  {
    id: 'event-1',
    type: 'event',
    title: 'Saturday Group Ride',
    coordinate: { latitude: 34.0490, longitude: -118.2550 },
  },
  {
    id: 'event-2',
    type: 'event',
    title: 'Bike Night Meetup',
    coordinate: { latitude: 34.0600, longitude: -118.2300 },
  },
];
