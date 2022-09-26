import { useEffect, useState } from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { Outlet } from 'react-router-native';
import NavBar from '../components/NavBar';
import { useKeyboard } from '../hooks/use-keyboard';

export default function HomeLayout() {
  const { isKeyboardVisible } = useKeyboard();

  return (
    <View style={styles.homeLayout}>
      <Outlet />
      {isKeyboardVisible ? null : <NavBar />}
    </View>
  );
}

const styles = StyleSheet.create({
  homeLayout: {
    flex: 1
  }
});
