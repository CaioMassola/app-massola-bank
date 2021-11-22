import React from 'react';
import { View, Text } from 'react-native';
import { Background } from '../../components/Background';

import { styles } from './styles';

export const Login = () => {
  return (
    <Background>
      <View style={styles.container}>
        <Text>Este é o meu mundo!</Text>
      </View>
    </Background>
  )
}