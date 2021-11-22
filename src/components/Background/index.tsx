import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { color} from '../../global/color';

import { styles } from './styles';

type Props = {
    children: ReactNode;
  }

export const Background = ({children}: Props)  => {

    const { primary, secondary } = color.colors;

    return (
        <LinearGradient
          style={styles.container}
          colors={[primary, secondary]}
        >
            {children}
        </LinearGradient>
      )
}