import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';

export function ScreenScaffold({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text
          style={styles.h1}
          accessibilityRole="header"
          maxFontSizeMultiplier={1.3}
        >
          {title}
        </Text>
        {subtitle ? <Text style={styles.muted}>{subtitle}</Text> : null}
        <View style={{ height: subtitle ? 8 : 12 }} />
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export const Spacer = ({
  size = 12,
  vertical = false,
}: {
  size?: number;
  vertical?: boolean;
}) => (
  <View
    style={vertical ? { height: size } : { width: size }}
    accessibilityElementsHidden
  />
);

export const baseStyles = StyleSheet.create({
  card: { backgroundColor: '#F6F8FA', borderRadius: 16, padding: 12 },
  row: { flexDirection: 'row', alignItems: 'center' },
  pill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#E8EDF3',
    alignSelf: 'flex-start',
  },
  pillText: { fontWeight: '700', color: '#374151' },
  imagePh: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: '#DDE3EA',
  },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, paddingBottom: 48 },
  h1: { fontSize: 22, fontWeight: '700' },
  muted: { color: '#5B6876' },
});
