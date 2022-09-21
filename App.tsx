import React, { useCallback, useEffect } from "react";
import { AppRegistry, StatusBar, Text, View } from "react-native";
import { Righteous_400Regular } from "@expo-google-fonts/righteous";
import { Inter_300Light } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Routes from "./src/routes";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { expo } from "./app.json";

const App = () => {
  const [fontsLoaded] = useFonts({
    Righteous_400Regular,
    Inter_300Light,
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <Routes />
        </View>
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(expo.name, () => App);

export default App;
