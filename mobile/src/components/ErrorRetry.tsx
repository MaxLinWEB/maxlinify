import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radii } from '@/constants/theme';

interface ErrorRetryProps {
  message?: string;
  onRetry: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}

export function ErrorRetry({
  message = 'Something went wrong',
  onRetry,
  icon = 'cloud-offline-outline',
}: ErrorRetryProps) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={48} color={colors.textSecondary} style={{ opacity: 0.5 }} />
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={onRetry} activeOpacity={0.8}>
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Ionicons name="refresh" size={16} color={colors.teal} />
          <Text style={styles.buttonText}>Try Again</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    paddingHorizontal: 48,
    gap: 16,
  },
  message: {
    color: colors.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: radii.pill,
    marginTop: 8,
  },
  buttonText: {
    color: colors.teal,
    fontSize: 14,
    fontWeight: '700',
  },
});
