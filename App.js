import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './page_home/HomeScreen';
import VocabularyScreen from './page_vocabulary/VocabularyScreen';
import GrammarScreen from './page_grammar/GrammarScreen';
import PronunciationScreen from './page_pronunciation/PronunciationScreen';
import ReadingScreen from './page_reading/ReadingScreen';
import WritingScreen from './page_writing/WritingScreen';
import ListeningScreen from './page_listening/ListeningScreen';
import SpeakingScreen from './page_speaking/SpeakingScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Vocabulary" component={VocabularyScreen} />
        <Stack.Screen name="Grammar" component={GrammarScreen} />
        <Stack.Screen name="Pronunciation" component={PronunciationScreen} />
        <Stack.Screen name="Reading" component={ReadingScreen} />
        <Stack.Screen name="Writing" component={WritingScreen} />
        <Stack.Screen name="Listening" component={ListeningScreen} />
        <Stack.Screen name="Speaking" component={SpeakingScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
