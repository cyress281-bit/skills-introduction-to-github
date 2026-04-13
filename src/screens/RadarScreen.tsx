import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../constants/theme';
import { MOCK_PINS, MAP_REGION, NEARBY_RIDER_COUNT } from '../data/mockData';
import { HeaderBar, DarkMapView, FloatingActionButton } from '../components';

export const RadarScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <DarkMapView region={MAP_REGION} pins={MOCK_PINS} />
      <HeaderBar nearbyCount={NEARBY_RIDER_COUNT} />
      <FloatingActionButton onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
