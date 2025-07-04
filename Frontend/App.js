import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './src/screens/SignInScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import Diabetic_Retinopathy from './src/screens/Diabetic_Retinopathy';
import { Provider as PaperProvider } from 'react-native-paper';
import ProfileScreen from './src/screens/ProfileScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}

          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }}

          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}

          />
          <Stack.Screen
            name="Diabetic_Retinopathy"
            component={Diabetic_Retinopathy}
            options={{ headerShown: false }}

          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}

          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>

  );
}
