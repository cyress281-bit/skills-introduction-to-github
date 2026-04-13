import { useState, useEffect } from 'react';
import { mockMapPins, mockNearbyRiders } from '../data/mockData';
import { MapPin, NearbyRider } from '../types';

// This hook will eventually connect to Supabase realtime
// For now it returns mock data with simulated live updates
export function useRadarData() {
  const [pins, setPins] = useState<MapPin[]>(mockMapPins);
  const [nearbyRiders, setNearbyRiders] = useState<NearbyRider[]>(mockNearbyRiders);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    // Simulate live updates every 30 seconds
    // In production: subscribe to Supabase realtime channels
    // supabase.channel('radar').on('broadcast', ...).subscribe()
    const interval = setInterval(() => {
      setIsLive((prev) => prev);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return { pins, nearbyRiders, isLive };
}
