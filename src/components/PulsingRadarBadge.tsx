import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Colors, FontSize, Spacing } from '../constants/theme';

interface PulsingRadarBadgeProps {
  count: number;
}

export const PulsingRadarBadge: React.FC<PulsingRadarBadgeProps> = ({ count }) => {
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.radarRing, { opacity: pulseAnim }]} />
      <View style={styles.innerCircle}>
        <Text style={styles.countText}>{count}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
  },
  radarRing: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  innerCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.accentDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: Colors.accent,
    fontSize: FontSize.xs,
    fontWeight: '700',
  },
});
