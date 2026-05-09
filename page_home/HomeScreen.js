import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const getResponsiveLayout = (screenWidth) => {
  if (screenWidth < 600) {
    // Narrow screens - 1 column (7 rows)
    const tileSize = Math.min(screenWidth - 32, 350);
    return {
      layout: 'single',
      headerFontSize: 40,
      headerSubtitleSize: 16,
      tilePadding: 20,
      iconSize: 40,
      titleSize: 20,
      subtitleSize: 12,
      tileSize: tileSize,
      screenWidth: screenWidth,
    };
  } else {
    // All other screens - 3 tiles top, 4 tiles bottom
    return {
      layout: 'custom',
      headerFontSize: 56,
      headerSubtitleSize: 18,
      tilePadding: 24,
      iconSize: 48,
      titleSize: 22,
      subtitleSize: 13,
      screenWidth: screenWidth,
    };
  }
};

const modules = [
  { id: 1, title: 'VOCABULARY', subtitle: 'Слова', color: '#FF6B9D', icon: '📚' },
  { id: 2, title: 'GRAMMAR', subtitle: 'Грамматика', color: '#4ECDC4', icon: '✍️' },
  { id: 3, title: 'PRONUNCIATION', subtitle: 'Произношение', color: '#FFE66D', icon: '🗣️' },
  { id: 4, title: 'READING', subtitle: 'Читаем', color: '#95E1D3', icon: '📖' },
  { id: 5, title: 'WRITING', subtitle: 'Пишем', color: '#F38181', icon: '✏️' },
  { id: 6, title: 'LISTENING', subtitle: 'Слушаем', color: '#AA96DA', icon: '🎧' },
  { id: 7, title: 'SPEAKING', subtitle: 'Говорим', color: '#FCBAD3', icon: '💬' },
];

const ModuleTile = ({ module, layout, tilesInRow }) => {
  // Calculate tile size based on number of tiles in row
  const gap = 16;
  const padding = 32;
  const maxRowWidth = 900; // Max width for the row
  const availableWidth = Math.min(layout.screenWidth - padding, maxRowWidth);
  const tileSize = (availableWidth - (tilesInRow - 1) * gap) / tilesInRow;

  // Calculate available width for text (tile width minus padding)
  const textWidth = tileSize - (layout.tilePadding * 2);

  // Estimate character width and calculate scale
  const titleCharWidth = layout.titleSize * 0.6; // Approximate char width
  const subtitleCharWidth = layout.subtitleSize * 0.55;

  const titleTextWidth = module.title.length * titleCharWidth;
  const subtitleTextWidth = module.subtitle.length * subtitleCharWidth;

  // Calculate scale factors to fit text
  const titleScale = Math.min(1, textWidth / titleTextWidth);
  const subtitleScale = Math.min(1, textWidth / subtitleTextWidth);

  const dynamicTitleSize = layout.titleSize * Math.max(titleScale, 0.5);
  const dynamicSubtitleSize = layout.subtitleSize * Math.max(subtitleScale, 0.6);

  return (
    <Pressable
      style={[styles.tile, {
        width: tileSize,
        height: tileSize,
      }]}
      onPress={() => console.log(`Pressed ${module.title}`)}
    >
      <View style={[styles.tileContent, {
        backgroundColor: module.color,
        padding: layout.tilePadding,
      }]}>
        <Text style={[styles.icon, { fontSize: layout.iconSize }]}>{module.icon}</Text>
        <Text
          style={[styles.title, { fontSize: dynamicTitleSize }]}
        >
          {module.title}
        </Text>
        <Text
          style={[styles.subtitle, { fontSize: dynamicSubtitleSize }]}
        >
          {module.subtitle}
        </Text>
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

  const renderModules = () => {
    if (layout.layout === 'single') {
      // Single column - 7 rows
      return modules.map((module) => (
        <ModuleTile
          key={module.id}
          module={module}
          layout={layout}
          tilesInRow={1}
        />
      ));
    } else {
      // Custom layout: 3 tiles top, 4 tiles bottom
      const topRow = modules.slice(0, 3);
      const bottomRow = modules.slice(3, 7);

      return (
        <>
          <View style={styles.row}>
            {topRow.map((module) => (
              <ModuleTile
                key={module.id}
                module={module}
                layout={layout}
                tilesInRow={3}
              />
            ))}
          </View>
          <View style={styles.row}>
            {bottomRow.map((module) => (
              <ModuleTile
                key={module.id}
                module={module}
                layout={layout}
                tilesInRow={4}
              />
            ))}
          </View>
        </>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[
          styles.header,
          layout.layout === 'single' && {
            paddingHorizontal: 24,
          },
          layout.layout === 'custom' && {
            maxWidth: 900,
            width: '100%',
            alignSelf: 'center',
            paddingHorizontal: dimensions.width <= 932 ? 16 : 0, // 900 + 32 padding
          }
        ]}>
          <Text style={[styles.headerTitle, { fontSize: layout.headerFontSize }]}>
            The English C2
          </Text>
          <Text style={[styles.headerSubtitle, { fontSize: layout.headerSubtitleSize }]}>
            Путь к совершенству
          </Text>
        </View>

        <View style={layout.layout === 'single' ? styles.singleGrid : styles.customGrid}>
          {renderModules()}
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
    alignItems: 'center',
  },
  header: {
    paddingTop: 20,
    marginBottom: 32,
    alignSelf: 'stretch',
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
  singleGrid: {
    alignItems: 'center',
    gap: 16,
  },
  customGrid: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
    justifyContent: 'center',
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
    letterSpacing: 0.5,
    flexShrink: 1,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    marginTop: 4,
    flexShrink: 1,
  },
});
