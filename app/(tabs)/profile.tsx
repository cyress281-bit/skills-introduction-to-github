import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';

// Mock profile data
const MOCK_PROFILE = {
  username: 'throttle_rider',
  full_name: 'Alex Rivera',
  bike_make: 'Ducati',
  bike_model: 'Panigale V4',
  bike_year: 2023,
  total_rides: 47,
  total_miles: 3842,
  member_since: '2024',
};

function StatBox({ value, label }: { value: string | number; label: string }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Avatar & Info */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AR</Text>
          </View>
          <View style={styles.onlineDot} />
        </View>
        <Text style={styles.displayName}>{MOCK_PROFILE.full_name}</Text>
        <Text style={styles.username}>@{MOCK_PROFILE.username}</Text>
        <View style={styles.bikeBadge}>
          <Text style={styles.bikeBadgeText}>
            🏍️ {MOCK_PROFILE.bike_year} {MOCK_PROFILE.bike_make} {MOCK_PROFILE.bike_model}
          </Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <StatBox value={MOCK_PROFILE.total_rides} label="Rides" />
        <View style={styles.statDivider} />
        <StatBox value={MOCK_PROFILE.total_miles.toLocaleString()} label="Miles" />
        <View style={styles.statDivider} />
        <StatBox value={MOCK_PROFILE.member_since} label="Since" />
      </View>

      {/* Settings-style menu */}
      <View style={styles.menuSection}>
        <Text style={styles.menuSectionLabel}>ACCOUNT</Text>
        {[
          { label: 'My Rides', icon: '🏍️' },
          { label: 'My Events', icon: '📍' },
          { label: 'Saved Routes', icon: '🗺️' },
          { label: 'Friends', icon: '👥' },
        ].map((item) => (
          <TouchableOpacity key={item.label} style={styles.menuItem}>
            <Text style={styles.menuItemIcon}>{item.icon}</Text>
            <Text style={styles.menuItemLabel}>{item.label}</Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.menuSectionLabel}>SETTINGS</Text>
        {[
          { label: 'Location Sharing', icon: '📡' },
          { label: 'Notifications', icon: '🔔' },
          { label: 'Privacy', icon: '🔒' },
          { label: 'Help & Support', icon: '❓' },
        ].map((item) => (
          <TouchableOpacity key={item.label} style={styles.menuItem}>
            <Text style={styles.menuItemIcon}>{item.icon}</Text>
            <Text style={styles.menuItemLabel}>{item.label}</Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.signOutBtn}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: { color: Colors.textPrimary, fontSize: 28, fontWeight: '800' },
  editBtn: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  editBtnText: { color: Colors.textPrimary, fontWeight: '600', fontSize: 13 },
  profileSection: { alignItems: 'center', paddingVertical: 20 },
  avatarContainer: { position: 'relative', marginBottom: 14 },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.neonGreen + '22',
    borderWidth: 2,
    borderColor: Colors.neonGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: Colors.neonGreen, fontSize: 28, fontWeight: '800' },
  onlineDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.neonGreen,
    borderWidth: 2,
    borderColor: Colors.background,
  },
  displayName: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  username: { color: Colors.textSecondary, fontSize: 14, marginBottom: 12 },
  bikeBadge: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  bikeBadgeText: { color: Colors.textSecondary, fontSize: 13 },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    borderRadius: 18,
    paddingVertical: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  statBox: { flex: 1, alignItems: 'center' },
  statValue: {
    color: Colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: { color: Colors.textSecondary, fontSize: 12, fontWeight: '500' },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.08)' },
  menuSection: { marginHorizontal: 16, marginBottom: 16 },
  menuSectionLabel: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 8,
    paddingLeft: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginBottom: 2,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  menuItemIcon: { fontSize: 18, width: 24, textAlign: 'center' },
  menuItemLabel: { color: Colors.textPrimary, fontSize: 15, flex: 1, fontWeight: '500' },
  menuItemArrow: { color: Colors.textMuted, fontSize: 20, fontWeight: '300' },
  signOutBtn: {
    marginHorizontal: 16,
    backgroundColor: 'rgba(255,59,48,0.1)',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,59,48,0.2)',
    marginBottom: 8,
  },
  signOutText: { color: Colors.danger, fontWeight: '700', fontSize: 15 },
});
