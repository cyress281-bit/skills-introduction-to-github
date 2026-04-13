import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Colors } from '../constants/theme';

interface LiveIndicatorProps {
  size?: number;
}

export const LiveIndicator: React.FC<LiveIndicatorProps> = ({ size = 8 }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.6,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.pulseRing,
          {
            width: size * 2.5,
            height: size * 2.5,
            borderRadius: size * 1.25,
            transform: [{ scale: pulseAnim }],
          },
        ]}
      />
      <View
        style={[
          styles.dot,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    backgroundColor: Colors.accentDim,
  },
  dot: {
    backgroundColor: Colors.accent,
  },
});
