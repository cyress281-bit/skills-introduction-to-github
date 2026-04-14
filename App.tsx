import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTabs from './src/navigation/BottomTabs';
import { Colors } from './src/constants/theme';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { Theme } from './src/constants';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer
        theme={{
          dark: true,
          colors: {
            primary: Colors.accent,
            background: Colors.background,
            card: Colors.surface,
            text: Colors.text,
            border: Colors.surface,
            notification: Colors.accent,
          },
          fonts: {
            regular: { fontFamily: 'System', fontWeight: '400' },
            medium: { fontFamily: 'System', fontWeight: '500' },
            bold: { fontFamily: 'System', fontWeight: '700' },
            heavy: { fontFamily: 'System', fontWeight: '900' },
          },
        }}
      >
        <BottomTabs />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerStyle: {
              backgroundColor: Theme.navigation.headerBackground,
            },
            headerTintColor: Theme.navigation.headerTint,
            tabBarStyle: {
              backgroundColor: Theme.navigation.tabBarBackground,
              borderTopColor: Theme.colors.border,
            },
            tabBarActiveTintColor: Theme.navigation.tabBarActiveTint,
            tabBarInactiveTintColor: Theme.navigation.tabBarInactiveTint,
            tabBarIcon: ({ color, size }) => {
              const icons: Record<string, React.ComponentProps<typeof Ionicons>['name']> = {
                Home: 'home',
                Map: 'map',
                Profile: 'person',
              };
              return (
                <Ionicons
                  name={icons[route.name] ?? 'ellipse'}
                  size={size}
                  color={color}
                />
              );
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
