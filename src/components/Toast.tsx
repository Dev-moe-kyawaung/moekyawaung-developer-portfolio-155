import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'warning';
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', visible }) => {
  if (!visible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success': return 'checkmark-circle';
      case 'warning': return 'alert-circle';
      case 'info':
      default: return 'information-circle';
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return { border: '#10B981', glow: 'rgba(16, 185, 129, 0.2)', icon: '#10B981' };
      case 'warning':
        return { border: '#F59E0B', glow: 'rgba(245, 158, 11, 0.2)', icon: '#F59E0B' };
      case 'info':
      default:
        return { border: '#00F0FF', glow: 'rgba(0, 240, 255, 0.2)', icon: '#00F0FF' };
    }
  };

  const themeColors = getColors();

  return (
    <View style={styles.toastContainer}>
      <View style={[styles.toastBox, { borderColor: themeColors.border, shadowColor: themeColors.border }]}>
        <Ionicons name={getIcon()} size={20} color={themeColors.icon} style={{ marginRight: 10 }} />
        <Text style={styles.toastText}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    zIndex: 9999,
  },
  toastBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 9999,
    borderWidth: 1.5,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  toastText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
  },
});
