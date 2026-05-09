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
      titleSize: 18,
      subtitleSize: 11,
    };
  } else if (screenWidth < 768) {
    // Phones
    return {
      columns: 2,
      headerFontSize: 48,
      headerSubtitleSize: 16,
      tilePadding: 20,
      iconSize: 40,
      titleSize: 20,
      subtitleSize: 12,
    };
  } else if (screenWidth < 1024) {
    // Tablets portrait
    return {
      columns: 3,
      headerFontSize: 56,
      headerSubtitleSize: 18,
      tilePadding: 24,
      iconSize: 48,
      titleSize: 22,
      subtitleSize: 13,
    };
  } else {
    // Large screens - 3 tiles top row, 4 tiles bottom row
    return {
      columns: 'custom', // Special layout
      headerFontSize: 64,
      headerSubtitleSize: 20,
      tilePadding: 28,
      iconSize: 56,
      titleSize: 24,
      subtitleSize: 14,
    };
  }
};

const modules = [
  { id: 1, title: 'VOCABULARY', subtitle: 'слова', color: '#FF6B9D', icon: '📚' },
  { id: 2, title: 'GRAMMAR', subtitle: 'грамматика', color: '#4ECDC4', icon: '✍️' },
  { id: 3, title: 'PRONUNCIATION', subtitle: 'произношение', color: '#FFE66D', icon: '🗣️' },
  { id: 4, title: 'READING', subtitle: 'читаем', color: '#95E1D3', icon: '📖' },
  { id: 5, title: 'WRITING', subtitle: 'пишем', color: '#F38181', icon: '✏️' },
  { id: 6, title: 'LISTENING', subtitle: 'слушаем', color: '#AA96DA', icon: '🎧' },
  { id: 7, title: 'SPEAKING', subtitle: 'говорим', color: '#FCBAD3', icon: '💬' },
];

const ModuleTile = ({ module, index, layout, screenWidth, isCustomLayout, rowIndex }) => {
  let tileWidth;

  if (isCustomLayout) {
    // Custom layout for large screens: 3 tiles in first row, 4 in second
    const tilesInRow = rowIndex === 0 ? 3 : 4;
    tileWidth = (screenWidth - (tilesInRow + 1) * 16) / tilesInRow;
  } else {
    tileWidth = (screenWidth - (layout.columns + 1) * 16) / layout.columns;
  }

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
  const isCustomLayout = layout.columns === 'custom';

  const renderModules = () => {
    if (isCustomLayout) {
      // Custom layout: 3 tiles top, 4 tiles bottom
      const topRow = modules.slice(0, 3);
      const bottomRow = modules.slice(3, 7);

      return (
        <>
          <View style={styles.row}>
            {topRow.map((module, index) => (
              <ModuleTile
                key={module.id}
                module={module}
                index={index}
                layout={layout}
                screenWidth={dimensions.width}
                isCustomLayout={true}
                rowIndex={0}
              />
            ))}
          </View>
          <View style={styles.row}>
            {bottomRow.map((module, index) => (
              <ModuleTile
                key={module.id}
                module={module}
                index={index + 3}
                layout={layout}
                screenWidth={dimensions.width}
                isCustomLayout={true}
                rowIndex={1}
              />
            ))}
          </View>
        </>
      );
    } else {
      // Regular grid layout
      return modules.map((module, index) => (
        <ModuleTile
          key={module.id}
          module={module}
          index={index}
          layout={layout}
          screenWidth={dimensions.width}
          isCustomLayout={false}
        />
      ));
    }
  };

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

        <View style={isCustomLayout ? styles.customGrid : styles.grid}>
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
  customGrid: {
    paddingHorizontal: 16,
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
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    marginTop: 4,
  },
});
