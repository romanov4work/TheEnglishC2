import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SpeakingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Speaking</Text>
      <Text style={styles.subtitle}>Говорим</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
  },
});
