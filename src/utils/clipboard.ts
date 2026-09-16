import * as Clipboard from 'expo-clipboard';
import { Platform } from 'react-native';

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    await Clipboard.setStringAsync(text);
    return true;
  } catch (err) {
    try {
      await Clipboard.setStringAsync(text);
      return true;
    } catch (e) {
      console.warn('Clipboard copy error:', e);
      return false;
    }
  }
}

export function downloadFile(filename: string, content: string, mimeType = 'text/markdown;charset=utf-8;') {
  if (Platform.OS === 'web' && typeof document !== 'undefined') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  }
  return false;
}
