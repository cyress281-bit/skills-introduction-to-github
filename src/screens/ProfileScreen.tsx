import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="person-outline" size={64} color={Colors.accent} />
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Coming soon</Text>
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
    color: Colors.text,
    fontSize: 22,
    fontWeight: '600',
    marginTop: 12,
  },
  subtitle: {
    color: Colors.textMuted,
    fontSize: 14,
    marginTop: 6,
  },
});
