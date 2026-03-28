import { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useLibraryStore } from '@/store/libraryStore';
import { hapticLight, hapticSuccess, hapticSelection } from '@/utils/haptics';
import { colors, radii } from '@/constants/theme';
import type { SearchResult } from '@maxlinify/shared';

interface BottomSheetProps {
  visible: boolean;
  track: SearchResult | null;
  onClose: () => void;
  onAddToQueue: () => void;
  onAddToFavorites: () => void;
  isFavorite: boolean;
}

export function BottomSheet({
  visible, track, onClose,
  onAddToQueue, onAddToFavorites, isFavorite,
}: BottomSheetProps) {
  const [showPlaylistPicker, setShowPlaylistPicker] = useState(false);
  const { playlists, addToPlaylist, createPlaylist } = useLibraryStore();

  if (!track) return null;

  const handleClose = () => {
    setShowPlaylistPicker(false);
    onClose();
  };

  const handleAddToPlaylist = (playlistId: string) => {
    addToPlaylist(playlistId, track);
    hapticSuccess();
    handleClose();
  };

  const handleCreateAndAdd = () => {
    hapticLight();
    const pl = createPlaylist(`My Playlist #${playlists.length + 1}`);
    addToPlaylist(pl.id, track);
    hapticSuccess();
    handleClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <Pressable style={styles.overlay} onPress={handleClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          {showPlaylistPicker ? (
            <>
              {/* Playlist Picker Header */}
              <View style={styles.pickerHeader}>
                <TouchableOpacity
                  onPress={() => { setShowPlaylistPicker(false); hapticLight(); }}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.pickerTitle}>Add to Playlist</Text>
                <View style={{ width: 24 }} />
              </View>

              {/* Create New */}
              <TouchableOpacity style={styles.createRow} onPress={handleCreateAndAdd}>
                <View style={styles.createIcon}>
                  <Ionicons name="add" size={24} color={colors.primary} />
                </View>
                <Text style={styles.createText}>Create New Playlist</Text>
              </TouchableOpacity>

              <View style={styles.divider} />

              {/* Playlist List */}
              <FlatList
                data={playlists}
                keyExtractor={(item) => item.id}
                style={{ maxHeight: 300 }}
                renderItem={({ item: pl }) => (
                  <TouchableOpacity
                    style={styles.playlistRow}
                    onPress={() => handleAddToPlaylist(pl.id)}
                  >
                    {pl.tracks[0]?.coverUrl ? (
                      <Image source={{ uri: pl.tracks[0].coverUrl }} style={styles.playlistCover} />
                    ) : (
                      <View style={[styles.playlistCover, styles.playlistCoverEmpty]}>
                        <Ionicons name="musical-notes" size={18} color={colors.textSecondary} />
                      </View>
                    )}
                    <View style={styles.playlistInfo}>
                      <Text style={styles.playlistName} numberOfLines={1}>{pl.name}</Text>
                      <Text style={styles.playlistMeta}>{pl.tracks.length} songs</Text>
                    </View>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <Text style={styles.emptyText}>No playlists yet</Text>
                }
              />
            </>
          ) : (
            <>
              {/* Track Header */}
              <View style={styles.trackRow}>
                <Image source={{ uri: track.coverUrl }} style={styles.trackCover} />
                <View style={styles.trackInfo}>
                  <Text style={styles.trackTitle} numberOfLines={1}>{track.title}</Text>
                  <Text style={styles.trackArtist} numberOfLines={1}>{track.artist}</Text>
                </View>
              </View>
              <View style={styles.divider} />
              <Action
                icon="list"
                label="Add to Queue"
                onPress={() => {
                  hapticLight();
                  onAddToQueue();
                  handleClose();
                }}
              />
              <Action
                icon={isFavorite ? 'heart' : 'heart-outline'}
                label={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                onPress={() => {
                  hapticSelection();
                  onAddToFavorites();
                  handleClose();
                }}
                iconColor={isFavorite ? colors.primary : undefined}
              />
              <Action
                icon="add-circle-outline"
                label="Add to Playlist"
                onPress={() => {
                  hapticLight();
                  setShowPlaylistPicker(true);
                }}
              />
              <Action icon="share-outline" label="Share" onPress={handleClose} />
            </>
          )}
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
    backgroundColor: colors.card,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  trackRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16 },
  trackCover: { width: 48, height: 48, borderRadius: radii.sm, backgroundColor: colors.input },
  trackInfo: { flex: 1, gap: 2 },
  trackTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: '700' },
  trackArtist: { color: colors.textSecondary, fontSize: 13 },
  divider: { height: 1, backgroundColor: colors.border, marginBottom: 8 },
  action: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 16 },
  actionLabel: { color: colors.textPrimary, fontSize: 16, fontWeight: '500' },

  // Playlist Picker
  pickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  pickerTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  createRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 12,
  },
  createIcon: {
    width: 44,
    height: 44,
    borderRadius: radii.sm,
    backgroundColor: colors.input,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  playlistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 10,
  },
  playlistCover: {
    width: 44,
    height: 44,
    borderRadius: radii.sm,
    backgroundColor: colors.input,
  },
  playlistCoverEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  playlistInfo: { flex: 1, gap: 2 },
  playlistName: { color: colors.textPrimary, fontSize: 15, fontWeight: '600' },
  playlistMeta: { color: colors.textSecondary, fontSize: 12 },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 24,
  },
});
