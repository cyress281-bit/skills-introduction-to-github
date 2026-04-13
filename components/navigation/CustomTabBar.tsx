import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';

const TAB_ICONS: Record<string, string> = {
  index: '◎',
  rides: '⊙',
  community: '◉',
  profile: '○',
};

const TAB_LABELS: Record<string, string> = {
  index: 'Radar',
  rides: 'Rides',
  community: 'Community',
  profile: 'Profile',
};

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.outerWrapper, { paddingBottom: insets.bottom + 8 }]}>
      <View style={styles.pill}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const label = TAB_LABELS[route.name] ?? route.name;
          const icon = TAB_ICONS[route.name] ?? '○';

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[styles.tabItem, isFocused && styles.tabItemActive]}
              accessibilityRole="button"
              accessibilityLabel={label}
            >
              <Text style={[styles.icon, isFocused && styles.iconActive]}>
                {icon}
              </Text>
              <Text style={[styles.label, isFocused && styles.labelActive]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: Colors.neonGreen,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 20,
  },
  pill: {
    flexDirection: 'row',
    backgroundColor: 'rgba(20, 20, 20, 0.96)',
    borderRadius: 36,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(57, 255, 20, 0.2)',
    width: '100%',
    justifyContent: 'space-around',
    shadowColor: Colors.neonGreen,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 4,
    borderRadius: 28,
  },
  tabItemActive: {
    backgroundColor: 'rgba(57, 255, 20, 0.1)',
  },
  icon: {
    fontSize: 18,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  iconActive: {
    color: Colors.neonGreen,
  },
  label: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  labelActive: {
    color: Colors.neonGreen,
    fontWeight: '700',
  },
});
