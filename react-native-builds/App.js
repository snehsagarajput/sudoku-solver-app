import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./components/start-screen.js";
import HomeScreen from "./components/home-screen.js";
import ImageScreen from "./components/image-upload-screen.js";
import SelectedImageScreen from "./components/selected-image-screen.js";
import Sudoku from "./components/sudoku-screen.js";




import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Animated: `useNativeDriver`']);


export default function App() {
  const [isLoading, setLoading] = useState(true);

  const Stack = createStackNavigator();
  const screenStyle = {
    headerShown: false,
    cardStyle: { backgroundColor: "#8CB0C3" },
    mode: "modal",
  };



  if (isLoading) {
    return < SplashScreen setLoading={setLoading} />
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={screenStyle}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Upload"
          component={ImageScreen}
        />
        <Stack.Screen
          name="ImageScreen"
          component={SelectedImageScreen}
        />
        <Stack.Screen
          name="SudokuScreen"
          component={Sudoku}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: "center"
  },
});
