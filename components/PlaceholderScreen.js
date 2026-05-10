import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';

export default function PlaceholderScreen({ navigation, title, subtitle }) {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.backBtn, pressed && styles.backBtnPressed]}
        onPress={() => navigation.goBack()}
        accessibilityRole="button"
        accessibilityLabel="Назад"
      >
        <Text style={styles.backIcon}>←</Text>
        <Text style={styles.backText}>Назад</Text>
      </Pressable>

      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.hint}>В разработке</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  backBtnPressed: {
    opacity: 0.5,
  },
  backIcon: {
    fontSize: 24,
    color: '#000000',
    marginRight: 6,
  },
  backText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 16,
  },
  hint: {
    fontSize: 14,
    color: '#999999',
    fontStyle: 'italic',
  },
});
