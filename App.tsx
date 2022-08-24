import { Platform, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Provider as PaperProvider, MD3LightTheme as defaultTheme } from 'react-native-paper';
import Router from './Router';

const theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#3C84FB',
    secondary: '#D1E2FF',
    tertiary: '#E7F0FF',
    error: '#FE4D4D',
    white: '#FFFFFFF'
  }
}

export default function App() {
  const [loaded] = useFonts({
    OpenSans: require('./assets/fonts/OpenSans-VariableFont.ttf'),
    Raleway: require('./assets/fonts/Raleway-VariableFont.ttf')
  });

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <View style={styles.appContainer}>
        <StatusBar backgroundColor="white" />
        <Router />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  appContainer:  {
    flex: 1,
    paddingTop: Platform.OS === 'android' || Platform.OS === 'ios' ? 24 : 0
  }
});
