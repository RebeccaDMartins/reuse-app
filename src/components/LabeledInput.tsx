import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';

export default function LabeledInput({
  label,
  accessibilityLabel,
  style,
  ...props
}: any) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text
        accessibilityRole="header"
        style={styles.label}
        maxFontSizeMultiplier={1.3}
      >
        {label}
      </Text>
      <TextInput
        {...props}
        accessibilityLabel={accessibilityLabel ?? label}
        placeholderTextColor="#9aa2a8"
        style={[styles.input, style]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontWeight: '700', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#D1D9E0',
    backgroundColor: '#fff',
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
});
