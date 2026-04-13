import React from 'react';
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

/* ── sample ride data ── */
const recentRides = [
  { id: '1', route: 'Downtown → Airport', distance: '18.4 km', time: '24 min' },
  { id: '2', route: 'Home → Office', distance: '7.2 km', time: '12 min' },
  { id: '3', route: 'Mall → Park', distance: '3.1 km', time: '8 min' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good evening,</Text>
            <Text style={styles.name}>Rider</Text>
          </View>
          <View style={styles.avatar}>
            <Ionicons name="person-circle" size={44} color={Colors.primary} />
          </View>
        </View>

        {/* ── Quick Actions ── */}
        <View style={[CardStyles.accent, styles.quickCard]}>
          <Text style={styles.cardTitle}>Start a Ride</Text>
          <Text style={styles.cardSub}>
            Track speed, distance, and route in real time.
          </Text>
          <TouchableOpacity style={ButtonStyles.primary} activeOpacity={0.8}>
            <Text style={ButtonTextStyles.primary}>Go Now</Text>
          </TouchableOpacity>
        </View>

        {/* ── Stats Row ── */}
        <View style={styles.statsRow}>
          {[
            { label: 'Rides', value: '142' },
            { label: 'Distance', value: '1,280 km' },
            { label: 'Top Speed', value: '167 km/h' },
          ].map((stat) => (
            <View key={stat.label} style={[CardStyles.base, styles.statCard]}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* ── Recent Rides ── */}
        <Text style={styles.sectionTitle}>Recent Rides</Text>
        {recentRides.map((ride) => (
          <View key={ride.id} style={[CardStyles.compact, styles.rideCard]}>
            <Ionicons
              name="navigate"
              size={22}
              color={Theme.accentColor}
              style={styles.rideIcon}
            />
            <View style={styles.rideInfo}>
              <Text style={styles.rideRoute}>{ride.route}</Text>
              <Text style={styles.rideMeta}>
                {ride.distance} · {ride.time}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ── Styles — all values reference the design system ── */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.base,
    paddingBottom: Spacing.huge,
  },

  /* header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  greeting: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  name: {
    ...Typography.heading,
    color: Colors.textPrimary,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* quick-action card */
  quickCard: {
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  cardTitle: {
    ...Typography.subheading,
    color: Colors.textPrimary,
  },
  cardSub: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },

  /* stats */
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...Typography.subheading,
    color: Colors.primary,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },

  /* rides list */
  sectionTitle: {
    ...Typography.subheading,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  rideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  rideIcon: {
    marginRight: Spacing.md,
  },
  rideInfo: {
    flex: 1,
  },
  rideRoute: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
  rideMeta: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
});
