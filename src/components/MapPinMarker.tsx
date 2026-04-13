import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../constants/theme';
import { PinType } from '../types';

interface MapPinMarkerProps {
  type: PinType;
  size?: number;
}

const PIN_COLORS: Record<PinType, string> = {
  user: Colors.pinRed,
  crew: Colors.pinGreen,
  event: Colors.pinBlue,
};

export const MapPinMarker: React.FC<MapPinMarkerProps> = ({ type, size = 16 }) => {
  const color = PIN_COLORS[type];

  return (
    <View style={styles.container}>
      <View style={[styles.glow, { backgroundColor: color, width: size * 2, height: size * 2, borderRadius: size }]} />
      <View style={[styles.pin, { backgroundColor: color, width: size, height: size, borderRadius: size / 2 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    opacity: 0.25,
  },
  pin: {
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.8)',
  },
});
