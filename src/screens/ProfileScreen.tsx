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
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  Colors,
  Spacing,
  Typography,
  ButtonStyles,
  ButtonTextStyles,
  CardStyles,
  Theme,
} from '../constants';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* ── Avatar + Name ── */}
        <View style={styles.avatarRow}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={48} color={Colors.primary} />
          </View>
          <Text style={styles.name}>Alex Rider</Text>
          <Text style={styles.handle}>@alexrider</Text>
        </View>

        {/* ── Stats ── */}
        <View style={[CardStyles.base, styles.statsCard]}>
          {[
            { icon: 'speedometer-outline' as const, label: 'Avg Speed', value: '62 km/h' },
            { icon: 'time-outline' as const, label: 'Total Time', value: '48 h' },
            { icon: 'trophy-outline' as const, label: 'Achievements', value: '12' },
          ].map((item) => (
            <View key={item.label} style={styles.statItem}>
              <Ionicons
                name={item.icon}
                size={22}
                color={Theme.accentColor}
              />
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* ── Actions ── */}
        <TouchableOpacity style={ButtonStyles.outline} activeOpacity={0.8}>
          <Text style={ButtonTextStyles.outline}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[ButtonStyles.secondary, styles.signOutBtn]}
          activeOpacity={0.8}
        >
          <Text style={ButtonTextStyles.secondary}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
  safe: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  content: {
    padding: Spacing.base,
    paddingBottom: Spacing.huge,
    alignItems: 'center',
  },

  /* avatar */
  avatarRow: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    marginTop: Spacing.xl,
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.backgroundCard,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
    marginBottom: Spacing.md,
  },
  name: {
    ...Typography.heading,
    color: Colors.textPrimary,
  },
  handle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },

  /* stats */
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: Spacing.xl,
  },
  statItem: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statValue: {
    ...Typography.subheading,
    color: Colors.textPrimary,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },

  /* buttons */
  signOutBtn: {
    marginTop: Spacing.md,
    width: '100%',
  },
});
