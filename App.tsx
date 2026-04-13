import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RadarScreen, PlaceholderScreen } from './src/screens';
import { Colors } from './src/constants/theme';

const Tab = createBottomTabNavigator();

const TAB_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  Radar: 'radio-outline',
  Rides: 'bicycle-outline',
  Community: 'people-outline',
  Profile: 'person-outline',
};

function RidesScreen() {
  return <PlaceholderScreen title="Rides" />;
}

function CommunityScreen() {
  return <PlaceholderScreen title="Community" />;
}

function ProfileScreen() {
  return <PlaceholderScreen title="Profile" />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          initialRouteName="Radar"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, size }) => {
              const iconName = TAB_ICONS[route.name] ?? 'ellipse-outline';
              return (
                <Ionicons
                  name={iconName}
                  size={size}
                  color={focused ? Colors.accent : Colors.textSecondary}
                />
              );
            },
            tabBarActiveTintColor: Colors.accent,
            tabBarInactiveTintColor: Colors.textSecondary,
            tabBarStyle: {
              backgroundColor: Colors.surface,
              borderTopWidth: 0,
              height: 70,
              paddingBottom: 10,
              paddingTop: 8,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              position: 'absolute',
              elevation: 20,
              shadowColor: Colors.accent,
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.15,
              shadowRadius: 16,
            },
            tabBarLabelStyle: {
              fontSize: 10,
              fontWeight: '600',
              letterSpacing: 0.5,
            },
          })}
        >
          <Tab.Screen name="Radar" component={RadarScreen} />
          <Tab.Screen name="Rides" component={RidesScreen} />
          <Tab.Screen name="Community" component={CommunityScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
