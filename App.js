import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import SliderTop from './componenets/SliderTop';
import { useFonts } from 'expo-font';
import LoginPage from './componenets/LoginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';

export default function App() {
  const stack = createNativeStackNavigator();

  const [fontsLoaded] = useFonts({
    'YekanBakh-Bold': require('./assets/fonts/YekanBakh-Bold.ttf'),
    'YekanBakh-Light': require('./assets/fonts/YekanBakh-Light.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <>
      <StatusBar style='light'/>
      <NavigationContainer>
        <stack.Navigator screenOptions={{headerShown: false}}>
          <stack.Screen name = "LoginPage" component={LoginPage}/>
          <stack.Screen name = "HomePage" component={SliderTop}/>
        </stack.Navigator>
      </NavigationContainer>
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
