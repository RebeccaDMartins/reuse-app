import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export function PrimaryButton({
  label,
  onPress,
  accessibilityLabel,
}: {
  label: string;
  onPress: () => void;
  accessibilityLabel?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      style={({ pressed }) => [styles.primary, pressed && styles.pressed]}
      hitSlop={12}
    >
      <Text style={styles.primaryText}>{label}</Text>
    </Pressable>
  );
}

export function OutlineButton({
  label,
  onPress,
  accessibilityLabel,
}: {
  label: string;
  onPress: () => void;
  accessibilityLabel?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      style={({ pressed }) => [styles.outline, pressed && styles.pressed]}
      hitSlop={12}
    >
      <Text style={styles.outlineText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primary: {
    backgroundColor: '#9D9C9C',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryText: { color: '#fff', fontWeight: '700' },
  outline: {
    borderWidth: 1.6,
    borderColor: '#9D9C9C',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  outlineText: { color: '#9D9C9C', fontWeight: '700' },
  pressed: { opacity: 0.9 },
});
