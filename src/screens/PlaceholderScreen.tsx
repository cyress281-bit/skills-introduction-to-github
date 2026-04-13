import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, FontSize } from '../constants/theme';

interface PlaceholderScreenProps {
  title: string;
}

export const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.subtext}>Coming soon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.text,
    fontSize: FontSize.xl,
    fontWeight: '700',
  },
  subtext: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
    marginTop: 8,
  },
});
