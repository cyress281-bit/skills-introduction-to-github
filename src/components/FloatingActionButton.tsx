import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';

interface FloatingActionButtonProps {
  onPress?: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onPress }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.glowRing} />
      <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
        <Ionicons name="add" size={32} color={Colors.background} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 90,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  glowRing: {
    position: 'absolute',
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.accentGlow,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
});
