import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

export function useKeyboard() {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });
  }, []);

  return { isKeyboardVisible };
}
