import { ScrollView, StyleSheet, View } from 'react-native';
import { Outlet } from 'react-router-native';
import Navbar from '../components/Navbar';

export default function HomeLayout() {
  return (
    <View style={styles.homeLayout}>
      <ScrollView>
        <Outlet />
      </ScrollView>
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  homeLayout: {
    flex: 1
  }
});
