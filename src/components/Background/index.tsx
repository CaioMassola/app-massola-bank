import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { color } from '../../global/color';

import { styles } from './styles';

type Props = {
  children: ReactNode;
  dark_mode: boolean
}

 const Background = ({ children, dark_mode }: Props) => {
  
  
  const { primary, secondary } = dark_mode ? color.dark : color.light
  
  return (
    <LinearGradient
      style={styles.container}
      colors={[primary, secondary]}
    >
      {children}
    </LinearGradient>
  )
}

const Props = (state: any) => {
  const  dark_mode = state.darkModeReducer;

  return dark_mode ;
};

export default connect(Props)(Background);