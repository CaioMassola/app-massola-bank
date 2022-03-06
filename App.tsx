import React from 'react';
import { StatusBar} from 'react-native';
import { Righteous_400Regular} from '@expo-google-fonts/righteous';
import {Inter_300Light} from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';

import AppLoading from 'expo-app-loading';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Righteous_400Regular,
    Inter_300Light
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </>
  );
}