import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

interface ThemedTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
  color?: string;
}

export function ThemedText({ variant = 'body', color, style, ...props }: ThemedTextProps) {
  return (
    <Text
      style={[styles.base, styles[variant], color ? { color } : undefined, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: { color: Colors.textPrimary },
  h1: { fontSize: 32, fontWeight: '800', letterSpacing: -0.5 },
  h2: { fontSize: 24, fontWeight: '700' },
  h3: { fontSize: 18, fontWeight: '600' },
  body: { fontSize: 15, fontWeight: '400', lineHeight: 22 },
  caption: { fontSize: 12, color: Colors.textSecondary },
  label: { fontSize: 13, fontWeight: '600', letterSpacing: 0.3 },
});
