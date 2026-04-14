import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

interface LiveIndicatorProps {
  size?: 'small' | 'medium';
}

export function LiveIndicator({ size = 'small' }: LiveIndicatorProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  const isSmall = size === 'small';

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.dot,
          isSmall ? styles.dotSmall : styles.dotMedium,
          { opacity: pulseAnim },
        ]}
      />
      <Text style={[styles.text, isSmall ? styles.textSmall : styles.textMedium]}>
        LIVE
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(57, 255, 20, 0.12)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(57, 255, 20, 0.3)',
  },
  dot: {
    borderRadius: 100,
    backgroundColor: Colors.neonGreen,
  },
  dotSmall: { width: 6, height: 6 },
  dotMedium: { width: 8, height: 8 },
  text: {
    color: Colors.neonGreen,
    fontWeight: '700',
    letterSpacing: 1,
  },
  textSmall: { fontSize: 10 },
  textMedium: { fontSize: 12 },
});
