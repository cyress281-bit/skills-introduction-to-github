import React from 'react';
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
