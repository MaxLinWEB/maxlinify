import { Audio, AVPlaybackStatus } from 'expo-av';

type StatusCallback = (status: AVPlaybackStatus) => void;

class AudioService {
  private sound: Audio.Sound | null = null;
  private statusCallback: StatusCallback | null = null;

  setStatusCallback(cb: StatusCallback) {
    this.statusCallback = cb;
  }

  private onStatusUpdate = (status: AVPlaybackStatus) => {
    this.statusCallback?.(status);
  };

  async loadAndPlay(mp3Url: string): Promise<void> {
    await this.unload();

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
    });

    const { sound } = await Audio.Sound.createAsync(
      { uri: mp3Url },
      { shouldPlay: true, progressUpdateIntervalMillis: 500 },
      this.onStatusUpdate
    );
    this.sound = sound;
  }

  async pause(): Promise<void> {
    await this.sound?.pauseAsync();
  }

  async resume(): Promise<void> {
    await this.sound?.playAsync();
  }

  async seek(positionMs: number): Promise<void> {
    await this.sound?.setPositionAsync(positionMs);
  }

  async unload(): Promise<void> {
    if (this.sound) {
      await this.sound.unloadAsync().catch(() => {});
      this.sound = null;
    }
  }

  isLoaded(): boolean {
    return this.sound !== null;
  }
}

export const audioService = new AudioService();
