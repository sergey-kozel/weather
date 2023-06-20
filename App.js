import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from "./src/screens/home";
import { WeatherScreen } from "./src/screens/weather";
import i18next from 'i18next';
import { useEffect, useState } from "react";
import { translationEN } from "./src/translations/en";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LoadingScreen } from "./src/screens/loading";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    Promise.all([i18next.init({
      compatibilityJSON: 'v3',
      lng: 'en',
      debug: false,
      fallbackLng: 'en',
      resources: {
        en: { translation: translationEN }
      }
    })])
      .then(() => {
        setIsReady(true);
      });
  })
  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer>
        { isReady &&
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Weather" component={WeatherScreen} />
          </Stack.Navigator>
        }
      </NavigationContainer>
      <LoadingScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
