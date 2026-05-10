import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, ScrollView, SafeAreaView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const getResponsiveLayout = (screenWidth) => {
  // All screens - 3 tiles top, 4 tiles bottom
  return {
    layout: 'custom',
    headerFontSize: screenWidth < 600 ? 32 : 56,
    headerSubtitleSize: screenWidth < 600 ? 14 : 18,
    tilePadding: screenWidth < 600 ? 16 : 24,
    iconSize: screenWidth < 600 ? 24 : 28,
    titleSize: screenWidth < 600 ? 16 : 22,
    subtitleSize: screenWidth < 600 ? 10 : 13,
    screenWidth: screenWidth,
  };
};

const modules = [
  { id: 1, title: 'VOCABULARY', subtitle: 'Слова', color: '#ffffff', icon: '📚', screen: 'Vocabulary' },
  { id: 2, title: 'GRAMMAR', subtitle: 'Грамматика', color: '#ffffff', icon: '✍️', screen: 'Grammar' },
  { id: 3, title: 'PRONUNCIATION', subtitle: 'Произношение', color: '#ffffff', icon: '🗣️', screen: 'Pronunciation' },
  { id: 4, title: 'READING', subtitle: 'Читаем', color: '#ffffff', icon: '📖', screen: 'Reading' },
  { id: 5, title: 'WRITING', subtitle: 'Пишем', color: '#ffffff', icon: '✏️', screen: 'Writing' },
  { id: 6, title: 'LISTENING', subtitle: 'Слушаем', color: '#ffffff', icon: '🎧', screen: 'Listening' },
  { id: 7, title: 'SPEAKING', subtitle: 'Говорим', color: '#ffffff', icon: '💬', screen: 'Speaking' },
];

const ModuleTile = ({ module, layout, tilesInRow, uniformTitleSize, uniformSubtitleSize, index, navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      delay: index * 50,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, index]);

  const gap = 16;
  const padding = 32;
  const maxRowWidth = 900;
  const availableWidth = Math.min(layout.screenWidth - padding, maxRowWidth);
  const tileSize = (availableWidth - (tilesInRow - 1) * gap) / tilesInRow;

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Pressable
        style={[styles.tile, {
          width: tileSize,
          height: tileSize,
        }]}
        onPress={() => navigation.navigate(module.screen)}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
      >
        <View style={[
          styles.tileContent,
          {
            padding: layout.tilePadding,
            paddingLeft: 7,
            backgroundColor: isPressed ? '#f5f5f5' : '#ffffff',
          }
        ]}>
          <View style={styles.iconContainer}>
            <Text style={[styles.icon, { fontSize: layout.iconSize }]}>{module.icon}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.title, { fontSize: uniformTitleSize }]}>
              {module.title}
            </Text>
            <Text style={[styles.subtitle, { fontSize: uniformSubtitleSize }]}>
              {module.subtitle}
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default function HomeScreen({ navigation }) {
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
    // Calculate for 4 tiles (wider row) to ensure consistency
    const uniformSizes = calculateUniformSizes(4);
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
              layout={layout}
              tilesInRow={3}
              uniformTitleSize={uniformSizes.titleSize}
              uniformSubtitleSize={uniformSizes.subtitleSize}
              index={index}
              navigation={navigation}
            />
          ))}
        </View>
        <View style={styles.row}>
          {bottomRow.map((module, index) => (
            <ModuleTile
              key={module.id}
              module={module}
              layout={layout}
              tilesInRow={4}
              uniformTitleSize={uniformSizes.titleSize}
              uniformSubtitleSize={uniformSizes.subtitleSize}
              index={index + 3}
              navigation={navigation}
            />
          ))}
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={[
            styles.header,
            {
              maxWidth: 900,
              width: '100%',
              alignSelf: 'center',
              paddingHorizontal: dimensions.width <= 932 ? 16 : 0,
            }
          ]}>
            <Text style={[styles.headerTitle, { fontSize: layout.headerFontSize }]}>
              The English C2
            </Text>
            <Text style={[styles.headerSubtitle, { fontSize: layout.headerSubtitleSize }]}>
              Путь к совершенству
            </Text>
          </View>

          <View style={styles.customGrid}>
            {renderModules()}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  background: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    paddingTop: 40,
    marginBottom: 40,
    alignSelf: 'stretch',
    paddingLeft: 8,
  },
  headerTitle: {
    fontWeight: '600',
    color: '#000000',
    letterSpacing: -1,
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#666666',
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  customGrid: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    justifyContent: 'center',
  },
  tile: {
    marginBottom: 0,
  },
  tileContent: {
    flex: 1,
    borderRadius: 16,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  iconContainer: {
    alignItems: 'flex-start',
  },
  icon: {
    lineHeight: 32,
  },
  textContainer: {
    gap: 4,
  },
  title: {
    fontWeight: '600',
    color: '#000000',
    letterSpacing: 0.2,
  },
  subtitle: {
    color: '#666666',
    fontWeight: '400',
    letterSpacing: 0,
  },
});
