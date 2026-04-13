import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSize, Spacing } from '../constants/theme';
import { LiveIndicator } from './LiveIndicator';
import { PulsingRadarBadge } from './PulsingRadarBadge';

interface HeaderBarProps {
  nearbyCount: number;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ nearbyCount }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + Spacing.sm }]}>
      {/* Left: Logo / Title */}
      <View style={styles.leftSection}>
        <PulsingRadarBadge count={nearbyCount} />
        <View style={styles.titleGroup}>
          <Text style={styles.logo}>RIDE RADAR</Text>
          <Text style={styles.subtitle}>
            {nearbyCount} Riders Nearby
          </Text>
        </View>
      </View>

      {/* Right: Live indicator */}
      <View style={styles.rightSection}>
        <LiveIndicator size={8} />
        <Text style={styles.liveText}>LIVE</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    backgroundColor: 'rgba(13, 13, 13, 0.85)',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  titleGroup: {
    flexDirection: 'column',
  },
  logo: {
    color: Colors.accent,
    fontSize: FontSize.lg,
    fontWeight: '800',
    letterSpacing: 2,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: FontSize.xs,
    marginTop: 2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  liveText: {
    color: Colors.accent,
    fontSize: FontSize.xs,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
