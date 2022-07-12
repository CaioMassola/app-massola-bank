import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../pages/Login";
import Home from "../pages/Home";
import CreateAccount from "../pages/CreateAccount";
import ForgotPassword from "../pages/ForgotPassword";
import BiometricAuth from "../pages/BiometricAuth";

const { Navigator, Screen } = createStackNavigator();

type IBiometric = {
  isBiometric: boolean;
};

export const AppRoutes = (props: IBiometric) => {
  if (props.isBiometric) {
    return (
      <Navigator
        screenOptions={{
          headerMode: "screen",
          headerShown: false,
        }}
      >
        <Screen name="Home" component={Home} />
      </Navigator>
    );
  } else {
    return (
      <Navigator
        screenOptions={{
          headerMode: "screen",
          headerShown: false,
        }}
      >
        <Screen name="BiometricAuth" component={BiometricAuth} />
        <Screen name="Login" component={Login} />
        <Screen name="CreateAccount" component={CreateAccount} />
        <Screen name="ForgotPassword" component={ForgotPassword} />
      </Navigator>
    );
  }
};
