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
      iconSize: 28,
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

const ModuleTile = ({ module, layout, tilesInRow, uniformTitleSize, uniformSubtitleSize }) => {
  // Calculate tile size based on number of tiles in row
  const gap = 16;
  const padding = 32;
  const maxRowWidth = 900; // Max width for the row
  const availableWidth = Math.min(layout.screenWidth - padding, maxRowWidth);
  const tileSize = (availableWidth - (tilesInRow - 1) * gap) / tilesInRow;

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
        <View style={styles.contentTop}>
          <Text style={[styles.icon, { fontSize: layout.iconSize }]}>{module.icon}</Text>
        </View>
        <View style={styles.contentBottom}>
          <Text
            style={[styles.title, { fontSize: uniformTitleSize }]}
          >
            {module.title}
          </Text>
          <Text
            style={[styles.subtitle, { fontSize: uniformSubtitleSize }]}
          >
            {module.subtitle}
          </Text>
        </View>
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

  // Calculate uniform font sizes for all tiles based on longest text
  const calculateUniformSizes = (tilesInRow) => {
    const gap = 16;
    const padding = 32;
    const maxRowWidth = 900;
    const availableWidth = Math.min(dimensions.width - padding, maxRowWidth);
    const tileSize = (availableWidth - (tilesInRow - 1) * gap) / tilesInRow;
    const textWidth = tileSize - (layout.tilePadding * 2);

    const titleCharWidth = layout.titleSize * 0.6; // Reduced from 0.75 for larger text
    const subtitleCharWidth = layout.subtitleSize * 0.55; // Reduced from 0.7 for larger text

    // Find minimum scale needed for all modules
    let minTitleScale = 1;
    let minSubtitleScale = 1;

    modules.forEach(module => {
      const titleTextWidth = module.title.length * titleCharWidth;
      const subtitleTextWidth = module.subtitle.length * subtitleCharWidth;

      const titleScale = Math.min(1, (textWidth * 0.9) / titleTextWidth); // Changed from 0.95 to 0.9
      const subtitleScale = Math.min(1, (textWidth * 0.9) / subtitleTextWidth); // Changed from 0.95 to 0.9

      minTitleScale = Math.min(minTitleScale, titleScale);
      minSubtitleScale = Math.min(minSubtitleScale, subtitleScale);
    });

    return {
      titleSize: layout.titleSize * Math.max(minTitleScale, 0.4) * 1.3,
      subtitleSize: layout.subtitleSize * Math.max(minSubtitleScale, 0.5) * 1.3,
    };
  };

  const renderModules = () => {
    if (layout.layout === 'single') {
      const uniformSizes = calculateUniformSizes(1);
      // Single column - 7 rows
      return modules.map((module) => (
        <ModuleTile
          key={module.id}
          module={module}
          layout={layout}
          tilesInRow={1}
          uniformTitleSize={uniformSizes.titleSize}
          uniformSubtitleSize={uniformSizes.subtitleSize}
        />
      ));
    } else {
      // Calculate for 4 tiles (wider row) to ensure consistency
      const uniformSizes = calculateUniformSizes(4);
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
                uniformTitleSize={uniformSizes.titleSize}
                uniformSubtitleSize={uniformSizes.subtitleSize}
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
                uniformTitleSize={uniformSizes.titleSize}
                uniformSubtitleSize={uniformSizes.subtitleSize}
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
  contentTop: {
    alignItems: 'flex-start',
    marginTop: -8,
  },
  contentBottom: {
    marginTop: 'auto',
  },
  icon: {
    lineHeight: 48,
  },
  title: {
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    flexShrink: 1,
    flexWrap: 'nowrap',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    marginTop: 4,
    flexShrink: 1,
    flexWrap: 'nowrap',
  },
});
