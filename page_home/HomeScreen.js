import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const getResponsiveLayout = (screenWidth) => {
  if (screenWidth < 375) {
    // Very small phones
    return {
      columns: 1,
      headerFontSize: 32,
      headerSubtitleSize: 14,
      tilePadding: 16,
      iconSize: 32,
      titleSize: 20,
      subtitleSize: 12,
    };
  } else if (screenWidth < 768) {
    // Phones
    return {
      columns: 2,
      headerFontSize: 48,
      headerSubtitleSize: 16,
      tilePadding: 20,
      iconSize: 40,
      titleSize: 22,
      subtitleSize: 13,
    };
  } else if (screenWidth < 1024) {
    // Tablets portrait
    return {
      columns: 3,
      headerFontSize: 56,
      headerSubtitleSize: 18,
      tilePadding: 24,
      iconSize: 48,
      titleSize: 24,
      subtitleSize: 14,
    };
  } else {
    // Tablets landscape / Desktop
    return {
      columns: 4,
      headerFontSize: 64,
      headerSubtitleSize: 20,
      tilePadding: 28,
      iconSize: 56,
      titleSize: 26,
      subtitleSize: 15,
    };
  }
};

const modules = [
  { id: 1, title: 'Слова', subtitle: 'Vocabulary', color: '#FF6B9D', icon: '📚' },
  { id: 2, title: 'Грамматика', subtitle: 'Grammar', color: '#4ECDC4', icon: '✍️' },
  { id: 3, title: 'Произношение', subtitle: 'Pronunciation', color: '#FFE66D', icon: '🗣️' },
  { id: 4, title: 'Читаем', subtitle: 'Reading', color: '#95E1D3', icon: '📖' },
  { id: 5, title: 'Пишем', subtitle: 'Writing', color: '#F38181', icon: '✏️' },
  { id: 6, title: 'Слушаем', subtitle: 'Listening', color: '#AA96DA', icon: '🎧' },
  { id: 7, title: 'Говорим', subtitle: 'Speaking', color: '#FCBAD3', icon: '💬' },
];

const ModuleTile = ({ module, index, layout, screenWidth }) => {
  const tileWidth = (screenWidth - (layout.columns + 1) * 16) / layout.columns;

  return (
    <Pressable
      style={[styles.tile, {
        width: tileWidth,
        aspectRatio: 1,
      }]}
      onPress={() => console.log(`Pressed ${module.title}`)}
    >
      <View style={[styles.tileContent, {
        backgroundColor: module.color,
        padding: layout.tilePadding,
      }]}>
        <Text style={[styles.icon, { fontSize: layout.iconSize }]}>{module.icon}</Text>
        <Text style={[styles.title, { fontSize: layout.titleSize }]}>{module.title}</Text>
        <Text style={[styles.subtitle, { fontSize: layout.subtitleSize }]}>{module.subtitle}</Text>
      </View>
    </Pressable>
  );
};

export default function HomeScreen() {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const layout = getResponsiveLayout(dimensions.width);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { fontSize: layout.headerFontSize }]}>
            The English C2
          </Text>
          <Text style={[styles.headerSubtitle, { fontSize: layout.headerSubtitleSize }]}>
            Путь к совершенству
          </Text>
        </View>

        <View style={styles.grid}>
          {modules.map((module, index) => (
            <ModuleTile
              key={module.id}
              module={module}
              index={index}
              layout={layout}
              screenWidth={dimensions.width}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    marginBottom: 32,
  },
  headerTitle: {
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -2,
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#8B92B0',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 16,
  },
  tile: {
    marginBottom: 0,
  },
  tileContent: {
    flex: 1,
    borderRadius: 24,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  icon: {
    lineHeight: 48,
  },
  title: {
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 'auto',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    marginTop: 4,
  },
});
