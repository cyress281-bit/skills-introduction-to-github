import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, Theme } from '../constants';

/**
 * MapScreen — placeholder that demonstrates theme usage on the map tab.
 *
 * A real implementation would render `<MapView>` here; we show a styled
 * placeholder so the design-system tokens are exercised.
 */
export default function MapScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.icon}>🗺️</Text>
        <Text style={styles.title}>Live Map</Text>
        <Text style={styles.subtitle}>
          Real-time ride tracking coming soon.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholder: {
    alignItems: 'center',
    padding: Spacing.xxl,
  },
  icon: {
    fontSize: 56,
    marginBottom: Spacing.base,
  },
  title: {
    ...Typography.heading,
    color: Theme.accentColor,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
