import { ScrollView, StyleSheet, View } from 'react-native';
import { Outlet } from 'react-router-native';
import NavBar from '../components/NavBar';

export default function HomeLayout() {
  return (
    <View style={styles.homeLayout}>
      <Outlet />
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  homeLayout: {
    flex: 1
  }
});
