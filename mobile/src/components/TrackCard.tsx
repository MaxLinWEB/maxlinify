import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii } from '@/constants/theme';
import { formatTime } from '@/utils/formatTime';
import type { SearchResult } from '@maxlinify/shared';

interface TrackCardProps {
  track: SearchResult;
  onPress: (track: SearchResult) => void;
  onLongPress?: (track: SearchResult) => void;
  isPlaying?: boolean;
}

export function TrackCard({ track, onPress, onLongPress, isPlaying }: TrackCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => onPress(track)}
      onLongPress={() => onLongPress?.(track)}
    >
      {/* Cover */}
      <View style={styles.coverWrap}>
        <Image source={{ uri: track.coverUrl }} style={styles.cover} transition={200} />
        {isPlaying && (
          <View style={styles.playingOverlay}>
            <View style={styles.playingBars}>
              {[6, 10, 4].map((h, i) => (
                <View key={i} style={[styles.playingBar, { height: h }]} />
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={[styles.title, isPlaying && styles.titleActive]} numberOfLines={1}>{track.title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{track.artist}</Text>
      </View>

      {/* Right */}
      <View style={styles.right}>
        {track.duration > 0 && <Text style={styles.duration}>{formatTime(track.duration * 1000)}</Text>}
        <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} onPress={() => onLongPress?.(track)}>
          <Ionicons name="ellipsis-vertical" size={16} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10, paddingHorizontal: 24, gap: 12,
    height: 76,
  },
  coverWrap: { width: 56, height: 56 },
  cover: { width: 56, height: 56, borderRadius: radii.xs, backgroundColor: colors.input },
  playingOverlay: {
    ...StyleSheet.absoluteFillObject, borderRadius: radii.xs,
    backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center',
  },
  playingBars: { flexDirection: 'row', alignItems: 'flex-end', gap: 2, height: 14 },
  playingBar: { width: 2, backgroundColor: colors.primary, borderRadius: 1 },
  info: { flex: 1, gap: 4 },
  title: { color: colors.textPrimary, fontSize: 16, fontWeight: '600', lineHeight: 24 },
  titleActive: { color: colors.primary },
  artist: { color: colors.textSecondary, fontSize: 12, lineHeight: 16 },
  right: { alignItems: 'flex-end', gap: 6 },
  duration: { color: colors.textSecondary, fontSize: 12, lineHeight: 16 },
});
