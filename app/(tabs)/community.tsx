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
import { mockEvents } from '../../data/mockData';
import { Event } from '../../types';

function EventCard({ event }: { event: Event }) {
  const date = new Date(event.scheduled_at);
  const dateStr = date.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const typeColors: Record<Event['event_type'], string> = {
    meetup: Colors.neonGreen,
    rally: '#FF9500',
    race: Colors.pinCurrentUser,
    charity: '#AF52DE',
    other: Colors.textSecondary,
  };

  const typeColor = typeColors[event.event_type];

  return (
    <TouchableOpacity style={styles.eventCard} activeOpacity={0.8}>
      <View style={[styles.eventTypeBar, { backgroundColor: typeColor }]} />
      <View style={styles.eventContent}>
        <View style={styles.eventCardHeader}>
          <View
            style={[
              styles.typeBadge,
              { backgroundColor: typeColor + '22', borderColor: typeColor + '44' },
            ]}
          >
            <Text style={[styles.typeBadgeText, { color: typeColor }]}>
              {event.event_type.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.attendeeCount}>👥 {event.attendee_count} going</Text>
        </View>
        <Text style={styles.eventTitle}>{event.title}</Text>
        {event.description && (
          <Text style={styles.eventDesc} numberOfLines={2}>
            {event.description}
          </Text>
        )}
        <View style={styles.eventMeta}>
          <Text style={styles.metaText}>
            📅 {dateStr} at {timeStr}
          </Text>
          <Text style={styles.metaText}>
            📍 {event.location.name ?? event.location.address}
          </Text>
        </View>
        <TouchableOpacity style={styles.attendBtn}>
          <Text style={styles.attendBtnText}>I&apos;m Going</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default function CommunityScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
        <TouchableOpacity style={styles.createBtn}>
          <Text style={styles.createBtnText}>+ Event</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Section header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.eventsList}>
          {mockEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </View>

        {/* Community feed placeholder */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Community Feed</Text>
        </View>
        <View style={styles.feedPlaceholder}>
          <Text style={styles.placeholderEmoji}>🏍️</Text>
          <Text style={styles.placeholderText}>Community posts coming soon</Text>
          <Text style={styles.placeholderSub}>
            Connect with local riders, share routes, and post ride updates.
          </Text>
        </View>

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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
    marginTop: 4,
  },
  sectionTitle: { color: Colors.textPrimary, fontSize: 17, fontWeight: '700' },
  seeAll: { color: Colors.neonGreen, fontSize: 13, fontWeight: '600' },
  eventsList: { paddingHorizontal: 16, gap: 14 },
  eventCard: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  eventTypeBar: { width: 4 },
  eventContent: { flex: 1, padding: 16 },
  eventCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1 },
  typeBadgeText: { fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  attendeeCount: { color: Colors.textSecondary, fontSize: 12 },
  eventTitle: { color: Colors.textPrimary, fontSize: 16, fontWeight: '700', marginBottom: 4 },
  eventDesc: { color: Colors.textSecondary, fontSize: 12, marginBottom: 10, lineHeight: 17 },
  eventMeta: { gap: 3, marginBottom: 12 },
  metaText: { color: Colors.textSecondary, fontSize: 12 },
  attendBtn: {
    backgroundColor: 'rgba(57, 255, 20, 0.1)',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(57, 255, 20, 0.25)',
  },
  attendBtnText: { color: Colors.neonGreen, fontWeight: '700', fontSize: 13 },
  feedPlaceholder: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 40,
    marginHorizontal: 16,
    backgroundColor: Colors.surface,
    borderRadius: 18,
    marginBottom: 16,
  },
  placeholderEmoji: { fontSize: 40, marginBottom: 12 },
  placeholderText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  placeholderSub: {
    color: Colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
});
