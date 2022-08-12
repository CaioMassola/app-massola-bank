import React from "react";
import { AppRegistry, StatusBar, Text } from "react-native";
import { Righteous_400Regular } from "@expo-google-fonts/righteous";
import { Inter_300Light } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";

import AppLoading from "expo-app-loading";
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

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <Routes />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(expo.name, () => App);

export default App;
