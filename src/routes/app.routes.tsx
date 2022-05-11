import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../pages/Login";
import CreateAccount from "../pages/CreateAccount";

const { Navigator, Screen } = createStackNavigator();

export const AppRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerMode: "screen",
        headerShown: false,
      }}
    >
      <Screen name="Login" component={Login} />
      <Screen name="CreateAccount" component={CreateAccount} />
    </Navigator>
  );
};
