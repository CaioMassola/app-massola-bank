import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";
import BiometricAuth from "../pages/BiometricAuth";

const Routes = () => {
  const [isBiometricSupported, setIsBiometricSupported] =
    useState<boolean>(false);

  const [isAuth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });

  useEffect(() => {
    const handleBiometricAuth = async () => {
      try {
        const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
        if (!savedBiometrics) {
          return Alert.alert(
            "Biometric record not found",
            "Please verify your identity with your password",
            [
              {
                onPress: () => fallBackToDefaultAuth(),
              },
            ]
          );
        }

        if (savedBiometrics) {
          const biometricAuth = await LocalAuthentication.authenticateAsync({
            promptMessage: "Login",
            disableDeviceFallback: true,
            cancelLabel: "Cancel",
          });

          if (biometricAuth) {
            setAuth(biometricAuth.success);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    handleBiometricAuth();
  }, []);

  const fallBackToDefaultAuth = () => {
    console.log("precisa de biometria");
  };

  return (
    <NavigationContainer>
      <AppRoutes isBiometric={isAuth} />
    </NavigationContainer>
  );
};

export default Routes;
