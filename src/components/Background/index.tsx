import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode } from "react";
import { connect } from "react-redux";
import { color } from "../../global/color";

import { styles } from "./styles";

type Props = {
  children: ReactNode;
  dark_mode?: boolean;
  biometricAuthPage?: boolean;
};

const Background = ({ children, dark_mode, biometricAuthPage }: Props) => {
  const { primary, secondary } = dark_mode ? color.dark : color.light;

  return (
    <LinearGradient
      style={styles.container}
      colors={
        biometricAuthPage
          ? [color.light.primary, color.light.secondary]
          : [primary, secondary]
      }
    >
      {children}
    </LinearGradient>
  );
};

const props = (state: any) => {
  const dark_mode = state.darkModeReducer;

  return dark_mode;
};

export default connect(props)(Background);
