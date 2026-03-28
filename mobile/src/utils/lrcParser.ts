import type { LyricLine } from '@maxlinify/shared';

export function parseLRC(lrc: string): LyricLine[] {
  return lrc
    .split('\n')
    .map((line) => {
      const match = line.match(/\[(\d+):(\d+)\.(\d+)\](.*)/);
      if (!match) return null;
      const [, min, sec, cs, text] = match;
      return {
        timeMs:
          (parseInt(min, 10) * 60 + parseInt(sec, 10)) * 1000 +
          parseInt(cs, 10) * 10,
        text: text.trim(),
      };
    })
    .filter((line): line is LyricLine => line !== null);
}
