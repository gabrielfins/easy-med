import { Platform, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Provider as PaperProvider, MD3LightTheme as defaultTheme } from 'react-native-paper';
import Router from './Router';
import AuthContextProvider from './app/contexts/AuthContext';
import CallContextProvider from './app/contexts/CallContext';

const theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#3C84FB',
    secondary: '#D1E2FF',
    tertiary: '#E7F0FF',
    error: '#FE4D4D'
  }
}

export default function App() {  
  const [loaded] = useFonts({
    OpenSans: require('./assets/fonts/OpenSans-Regular.ttf'),
    OpenSansBold: require('./assets/fonts/OpenSans-Bold.ttf')
  });

  if (!loaded) {
    return null;
  }

  return (
    <AuthContextProvider>
      <CallContextProvider>
        <PaperProvider theme={theme}>
          <View style={styles.appContainer}>
            <StatusBar backgroundColor="white" />
            <Router />
          </View>
        </PaperProvider>
      </CallContextProvider>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  appContainer:  {
    flex: 1,
    paddingTop: Platform.OS === 'android' || Platform.OS === 'ios' ? 24 : 0
  }
});
