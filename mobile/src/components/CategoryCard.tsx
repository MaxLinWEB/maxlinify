import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radii } from '@/constants/theme';

interface CategoryCardProps {
  title: string;
  gradientColors: [string, string];
  overlayColor: string;
  onPress: () => void;
  height?: number;
}

export function CategoryCard({
  title,
  gradientColors,
  overlayColor,
  onPress,
  height = 159,
}: CategoryCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={{ height }}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, { height }]}
      >
        <View style={[styles.overlay, { backgroundColor: overlayColor }]} />
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.xl,
    padding: 20,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.25,
    borderRadius: radii.xl,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
});
