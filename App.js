import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SliderTop from './componenets/SliderTop';
import * as Font from 'expo-font';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'YekanBakh-Bold': require('./assets/fonts/YekanBakh-Bold.ttf'),
      'YekanBakh-Light': require('./assets/fonts/YekanBakh-Light.ttf'),
    }).then(() => setFontsLoaded(true));
  }, [])

  return (
    <>
      <StatusBar style='light'/>
      <SliderTop />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
