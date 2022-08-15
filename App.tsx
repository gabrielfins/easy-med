import { Platform, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import Router from './Router';

export default function App() {
  const [loaded] = useFonts({
    OpenSans: require('./assets/fonts/OpenSans-VariableFont.ttf'),
    Raleway: require('./assets/fonts/Raleway-VariableFont.ttf')
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.appContainer}>
      <StatusBar backgroundColor="white" />
      <Router />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer:  {
    paddingTop: Platform.OS === 'android' || Platform.OS === 'ios' ? 20 : 0
  }
});
