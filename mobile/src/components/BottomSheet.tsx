import { View, Text, TouchableOpacity, Modal, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii } from '@/constants/theme';
import type { SearchResult } from '@maxlinify/shared';

interface BottomSheetProps {
  visible: boolean;
  track: SearchResult | null;
  onClose: () => void;
  onAddToQueue: () => void;
  onAddToFavorites: () => void;
  onAddToPlaylist: () => void;
  isFavorite: boolean;
}

export function BottomSheet({
  visible, track, onClose,
  onAddToQueue, onAddToFavorites, onAddToPlaylist, isFavorite,
}: BottomSheetProps) {
  if (!track) return null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          {/* Track Header */}
          <View style={styles.trackRow}>
            <Image source={{ uri: track.coverUrl }} style={styles.trackCover} />
            <View style={styles.trackInfo}>
              <Text style={styles.trackTitle} numberOfLines={1}>{track.title}</Text>
              <Text style={styles.trackArtist} numberOfLines={1}>{track.artist}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <Action icon="list" label="Add to Queue" onPress={() => { onAddToQueue(); onClose(); }} />
          <Action
            icon={isFavorite ? 'heart' : 'heart-outline'}
            label={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            onPress={() => { onAddToFavorites(); onClose(); }}
            iconColor={isFavorite ? colors.primary : undefined}
          />
          <Action icon="add-circle-outline" label="Add to Playlist" onPress={() => { onAddToPlaylist(); onClose(); }} />
          <Action icon="share-outline" label="Share" onPress={onClose} />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function Action({ icon, label, onPress, iconColor }: {
  icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void; iconColor?: string;
}) {
  return (
    <TouchableOpacity style={styles.action} onPress={onPress}>
      <Ionicons name={icon} size={22} color={iconColor || colors.textPrimary} />
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.card, borderTopLeftRadius: radii.xl, borderTopRightRadius: radii.xl,
    paddingTop: 24, paddingBottom: 48, paddingHorizontal: 24,
  },
  trackRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16 },
  trackCover: { width: 48, height: 48, borderRadius: 6, backgroundColor: colors.input },
  trackInfo: { flex: 1, gap: 2 },
  trackTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: '700' },
  trackArtist: { color: colors.textSecondary, fontSize: 13 },
  divider: { height: 1, backgroundColor: colors.border, marginBottom: 8 },
  action: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 16 },
  actionLabel: { color: colors.textPrimary, fontSize: 16, fontWeight: '500' },
});
