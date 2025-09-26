import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Buscar',
}: {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
}) {
  return (
    <View style={styles.wrap} accessible accessibilityLabel="Barra de busca">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        accessibilityLabel="Campo de busca"
        returnKeyType="search"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#EFF2F5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flex: 1,
  },
  input: { fontSize: 16 },
});
