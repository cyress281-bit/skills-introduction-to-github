import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { mockCrewRides } from '../../data/mockData';
import { Ride } from '../../types';

function RideCard({ ride }: { ride: Ride }) {
  const scheduledDate = new Date(ride.scheduled_at);
  const timeUntil = scheduledDate.getTime() - Date.now();
  const hoursUntil = Math.floor(timeUntil / (1000 * 60 * 60));
  const minutesUntil = Math.floor((timeUntil % (1000 * 60 * 60)) / (1000 * 60));

  const timeStr =
    hoursUntil > 0
      ? `in ${hoursUntil}h ${minutesUntil}m`
      : `in ${minutesUntil}m`;

  return (
    <TouchableOpacity style={styles.rideCard} activeOpacity={0.8}>
      <View style={styles.rideCardHeader}>
        <View style={styles.crewBadge}>
          <Text style={styles.crewBadgeText}>CREW RIDE</Text>
        </View>
        <Text style={styles.rideTime}>{timeStr}</Text>
      </View>
      <Text style={styles.rideTitle}>{ride.title}</Text>
      {ride.description && (
        <Text style={styles.rideDesc} numberOfLines={2}>
          {ride.description}
        </Text>
      )}
      <View style={styles.rideMeta}>
        <Text style={styles.rideMetaText}>
          📍 {ride.start_location.address ?? 'Location TBD'}
        </Text>
        <Text style={styles.rideMetaText}>
          👥 {ride.participant_count}
          {ride.max_participants ? `/${ride.max_participants}` : ''} riders
        </Text>
      </View>
      <TouchableOpacity style={styles.joinBtn}>
        <Text style={styles.joinBtnText}>Join Ride</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default function RidesScreen() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rides</Text>
        <TouchableOpacity style={styles.createBtn}>
          <Text style={styles.createBtnText}>+ Create</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs - upcoming / past */}
      <View style={styles.segmentRow}>
        <TouchableOpacity style={[styles.segment, styles.segmentActive]}>
          <Text style={styles.segmentActiveText}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.segment}>
          <Text style={styles.segmentText}>Past</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.neonGreen}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {mockCrewRides.map((ride) => (
          <RideCard key={ride.id} ride={ride} />
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
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
  createBtn: {
    backgroundColor: Colors.neonGreen,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  createBtnText: { color: '#000', fontWeight: '700', fontSize: 13 },
  segmentRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 4,
  },
  segment: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 10 },
  segmentActive: { backgroundColor: Colors.surfaceElevated },
  segmentText: { color: Colors.textMuted, fontWeight: '600', fontSize: 13 },
  segmentActiveText: { color: Colors.textPrimary, fontWeight: '700', fontSize: 13 },
  list: { paddingHorizontal: 16, gap: 12 },
  rideCard: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  rideCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  crewBadge: {
    backgroundColor: 'rgba(57, 255, 20, 0.12)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(57, 255, 20, 0.25)',
  },
  crewBadgeText: {
    color: Colors.neonGreen,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  rideTime: { color: Colors.textSecondary, fontSize: 12 },
  rideTitle: { color: Colors.textPrimary, fontSize: 17, fontWeight: '700', marginBottom: 6 },
  rideDesc: { color: Colors.textSecondary, fontSize: 13, marginBottom: 12, lineHeight: 18 },
  rideMeta: { gap: 4, marginBottom: 14 },
  rideMetaText: { color: Colors.textSecondary, fontSize: 13 },
  joinBtn: {
    backgroundColor: 'rgba(57, 255, 20, 0.1)',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(57, 255, 20, 0.25)',
  },
  joinBtnText: { color: Colors.neonGreen, fontWeight: '700', fontSize: 14 },
});
