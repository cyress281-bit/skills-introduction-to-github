import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { LiveIndicator } from '../ui/LiveIndicator';
import { PulsingRiderIndicator } from '../ui/PulsingRiderIndicator';

interface RadarHeaderProps {
  riderCount: number;
}

export function RadarHeader({ riderCount }: RadarHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      {/* Glass background */}
      <View style={styles.glassBar}>
        {/* Left: Logo */}
        <View style={styles.logoArea}>
          <View style={styles.logoDot} />
          <Text style={styles.logoText}>RIDE RADAR</Text>
        </View>

        {/* Center: Rider count with pulse indicator */}
        <View style={styles.centerArea}>
          <PulsingRiderIndicator riderCount={riderCount} />
          <Text style={styles.riderText}>{riderCount} Riders Nearby</Text>
        </View>

        {/* Right: Live indicator */}
        <View style={styles.rightArea}>
          <LiveIndicator size="small" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  glassBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(13, 13, 13, 0.88)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(57, 255, 20, 0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  logoDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.neonGreen,
    shadowColor: Colors.neonGreen,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  logoText: {
    color: Colors.neonGreen,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
  },
  centerArea: {
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  riderText: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
    marginTop: 14,
  },
  rightArea: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
