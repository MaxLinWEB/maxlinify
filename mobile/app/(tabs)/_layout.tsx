import { View, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radii } from '@/constants/theme';
import { MiniPlayer } from '@/components/MiniPlayer';
import { hapticLight } from '@/utils/haptics';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 16);
  const tabBarHeight = 56 + bottomPadding;

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: [styles.tabBar, { height: tabBarHeight, paddingBottom: bottomPadding }],
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarLabelStyle: styles.tabLabel,
          tabBarIconStyle: { marginBottom: -2 },
        }}
        screenListeners={{
          tabPress: () => hapticLight(),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'HOME',
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.tabIconWrap}>
                <Ionicons name={focused ? 'home' : 'home-outline'} size={22} color={color} />
                {focused && <View style={styles.activeIndicator} />}
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'SEARCH',
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.tabIconWrap}>
                <Ionicons name={focused ? 'search' : 'search-outline'} size={22} color={color} />
                {focused && <View style={styles.activeIndicator} />}
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: 'LIBRARY',
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.tabIconWrap}>
                <Ionicons name={focused ? 'library' : 'library-outline'} size={22} color={color} />
                {focused && <View style={styles.activeIndicator} />}
              </View>
            ),
          }}
        />
      </Tabs>
      <MiniPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabBar: {
    backgroundColor: colors.navBg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 15,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  tabIconWrap: {
    alignItems: 'center',
    gap: 4,
  },
  activeIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});
