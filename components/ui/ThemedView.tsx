import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

interface ThemedViewProps extends ViewProps {
  variant?: 'default' | 'surface' | 'elevated' | 'card';
}

export function ThemedView({ variant = 'default', style, ...props }: ThemedViewProps) {
  return <View style={[styles.base, styles[variant], style]} {...props} />;
}

const styles = StyleSheet.create({
  base: {},
  default: { backgroundColor: Colors.background },
  surface: { backgroundColor: Colors.surface },
  elevated: { backgroundColor: Colors.surfaceElevated },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
});
