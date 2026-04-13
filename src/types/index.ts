export type PinType = 'user' | 'crew' | 'event';

export interface MapPin {
  id: string;
  type: PinType;
  title: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

export type TabName = 'Radar' | 'Rides' | 'Community' | 'Profile';
