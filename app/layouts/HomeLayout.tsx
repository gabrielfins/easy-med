import { StyleSheet, View } from 'react-native';
import { Outlet } from 'react-router-native';
import { useKeyboard } from '../hooks/use-keyboard';
import Navbar from '../components/Navbar';

export default function HomeLayout() {
  const { isKeyboardVisible } = useKeyboard();

  return (
    <View style={styles.homeLayout}>
      <Outlet />
      {isKeyboardVisible ? null : <Navbar />}
    </View>
  );
}

const styles = StyleSheet.create({
  homeLayout: {
    flex: 1
  }
});
