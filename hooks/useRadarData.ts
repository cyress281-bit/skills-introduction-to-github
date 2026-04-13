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
    // Pulse the live indicator every 30 seconds to show the radar is active.
    // In production: subscribe to Supabase realtime channels and update pins here.
    // supabase.channel('radar').on('broadcast', ...).subscribe()
    const interval = setInterval(() => {
      setIsLive(false);
      setTimeout(() => setIsLive(true), 300);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return { pins, nearbyRiders, isLive };
}
