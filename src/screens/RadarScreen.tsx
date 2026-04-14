import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';

export default function RadarScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="locate-outline" size={80} color={Colors.accent} />
      <Text style={styles.title}>Ride Radar</Text>
      <Text style={styles.subtitle}>Discover rides near you</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.accent,
    fontSize: 28,
    fontWeight: '700',
    marginTop: 16,
  },
  subtitle: {
    color: Colors.textMuted,
    fontSize: 16,
    marginTop: 8,
  },
});
