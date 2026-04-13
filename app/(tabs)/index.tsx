import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Modal,
  TouchableOpacity,
  Platform,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Colors } from '../../constants/Colors';
import { darkMapStyle } from '../../constants/MapStyle';
import { RadarHeader } from '../../components/radar/RadarHeader';
import { RadarFAB } from '../../components/radar/RadarFAB';
import { MOCK_USER_LOCATION } from '../../data/mockData';
import { useRadarData } from '../../hooks/useRadarData';
import { MapPin, Ride, Event } from '../../types';

// Marker colors by type
const PIN_COLORS: Record<MapPin['type'], string> = {
  user: Colors.pinCurrentUser,
  crew_ride: Colors.pinCrewRide,
  event: Colors.pinEvent,
};

export default function RadarScreen() {
  const { pins, nearbyRiders } = useRadarData();
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const mapRef = useRef<MapView>(null);

  const handleMarkerPress = (pin: MapPin) => {
    setSelectedPin(pin);
  };

  const handleFABPress = () => {
    setShowCreateModal(true);
  };

  const formatRideTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      {/* Full-Screen Map */}
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        customMapStyle={darkMapStyle}
        initialRegion={{
          latitude: MOCK_USER_LOCATION.latitude,
          longitude: MOCK_USER_LOCATION.longitude,
          latitudeDelta: 0.18,
          longitudeDelta: 0.18,
        }}
        showsUserLocation={false}
        showsCompass={false}
        showsScale={false}
        showsMyLocationButton={false}
      >
        {pins.map((pin) => (
          <Marker
            key={pin.id}
            coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
            onPress={() => handleMarkerPress(pin)}
            pinColor={PIN_COLORS[pin.type]}
          >
            <View style={[styles.markerContainer, pin.type === 'user' && styles.userMarker]}>
              {pin.type === 'user' ? (
                <View style={styles.userMarkerInner} />
              ) : (
                <View
                  style={[
                    styles.pinDot,
                    { backgroundColor: PIN_COLORS[pin.type] },
                  ]}
                />
              )}
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Header bar - overlaid on map */}
      <RadarHeader riderCount={nearbyRiders.length} />

      {/* Map Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.pinCurrentUser }]} />
          <Text style={styles.legendText}>You</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.pinCrewRide }]} />
          <Text style={styles.legendText}>Crew Rides</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.pinEvent }]} />
          <Text style={styles.legendText}>Events</Text>
        </View>
      </View>

      {/* Floating Action Button */}
      <RadarFAB onPress={handleFABPress} />

      {/* Selected Pin Bottom Sheet */}
      {selectedPin && (
        <View style={styles.pinSheet}>
          <View style={styles.pinSheetHandle} />
          <View style={styles.pinSheetContent}>
            <View style={styles.pinSheetHeader}>
              <View
                style={[
                  styles.pinTypeBadge,
                  {
                    backgroundColor: PIN_COLORS[selectedPin.type] + '22',
                    borderColor: PIN_COLORS[selectedPin.type] + '44',
                  },
                ]}
              >
                <Text style={[styles.pinTypeText, { color: PIN_COLORS[selectedPin.type] }]}>
                  {selectedPin.type === 'crew_ride'
                    ? 'CREW RIDE'
                    : selectedPin.type === 'event'
                    ? 'EVENT'
                    : 'YOU'}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setSelectedPin(null)}
                style={styles.closeBtn}
              >
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.pinTitle}>{selectedPin.title}</Text>
            {selectedPin.type === 'crew_ride' && selectedPin.data && (
              <View style={styles.pinMeta}>
                <Text style={styles.pinMetaText}>
                  🕐 {formatRideTime((selectedPin.data as Ride).scheduled_at)}
                </Text>
                <Text style={styles.pinMetaText}>
                  👥 {(selectedPin.data as Ride).participant_count} riders
                </Text>
              </View>
            )}
            {selectedPin.type === 'event' && selectedPin.data && (
              <View style={styles.pinMeta}>
                <Text style={styles.pinMetaText}>
                  🕐 {formatRideTime((selectedPin.data as Event).scheduled_at)}
                </Text>
                <Text style={styles.pinMetaText}>
                  👥 {(selectedPin.data as Event).attendee_count} attending
                </Text>
              </View>
            )}
            <TouchableOpacity style={styles.pinActionBtn}>
              <Text style={styles.pinActionBtnText}>
                {selectedPin.type === 'crew_ride'
                  ? 'Join Ride'
                  : selectedPin.type === 'event'
                  ? 'View Event'
                  : 'Your Location'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Create Modal */}
      <Modal
        visible={showCreateModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>What&apos;s happening?</Text>
            <Text style={styles.modalSubtitle}>Start something for the community</Text>

            <TouchableOpacity
              style={styles.createOption}
              onPress={() => {
                setShowCreateModal(false);
                Alert.alert('Coming Soon', 'Create Ride flow coming in next update!');
              }}
            >
              <View style={[styles.createOptionIcon, { backgroundColor: Colors.pinCrewRide + '22' }]}>
                <Text style={styles.createOptionEmoji}>🏍️</Text>
              </View>
              <View style={styles.createOptionText}>
                <Text style={styles.createOptionTitle}>Start a Crew Ride</Text>
                <Text style={styles.createOptionDesc}>Invite riders for a group ride</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.createOption}
              onPress={() => {
                setShowCreateModal(false);
                Alert.alert('Coming Soon', 'Create Event flow coming in next update!');
              }}
            >
              <View style={[styles.createOptionIcon, { backgroundColor: Colors.pinEvent + '22' }]}>
                <Text style={styles.createOptionEmoji}>📍</Text>
              </View>
              <View style={styles.createOptionText}>
                <Text style={styles.createOptionTitle}>Post an Event</Text>
                <Text style={styles.createOptionDesc}>Meetup, rally, or local event</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.createOption, { borderColor: 'rgba(255,59,48,0.2)' }]}
              onPress={() => {
                setShowCreateModal(false);
                Alert.alert('Coming Soon', 'Safety alerts coming in next update!');
              }}
            >
              <View style={[styles.createOptionIcon, { backgroundColor: 'rgba(255,59,48,0.1)' }]}>
                <Text style={styles.createOptionEmoji}>⚠️</Text>
              </View>
              <View style={styles.createOptionText}>
                <Text style={styles.createOptionTitle}>Report Road Hazard</Text>
                <Text style={styles.createOptionDesc}>Alert nearby riders</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setShowCreateModal(false)}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  // Markers
  markerContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 59, 48, 0.2)',
    borderWidth: 2,
    borderColor: Colors.pinCurrentUser,
  },
  userMarkerInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.pinCurrentUser,
  },
  pinDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  // Legend
  legend: {
    position: 'absolute',
    bottom: 170,
    left: 16,
    backgroundColor: 'rgba(13, 13, 13, 0.85)',
    borderRadius: 12,
    padding: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: '500',
  },
  // Pin bottom sheet
  pinSheet: {
    position: 'absolute',
    bottom: 90,
    left: 16,
    right: 16,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  pinSheetHandle: {
    width: 36,
    height: 4,
    backgroundColor: Colors.textMuted,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
  },
  pinSheetContent: {
    padding: 16,
  },
  pinSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pinTypeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  pinTypeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  pinTitle: {
    color: Colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 8,
  },
  pinMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  pinMetaText: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  pinActionBtn: {
    backgroundColor: Colors.neonGreen,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  pinActionBtnText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 14,
  },
  // Create modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  modalHandle: {
    width: 36,
    height: 4,
    backgroundColor: Colors.textMuted,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  modalSubtitle: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginBottom: 24,
  },
  createOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    gap: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  createOptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createOptionEmoji: {
    fontSize: 22,
  },
  createOptionText: {
    flex: 1,
  },
  createOptionTitle: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  createOptionDesc: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  cancelBtn: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 4,
  },
  cancelBtnText: {
    color: Colors.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
});
