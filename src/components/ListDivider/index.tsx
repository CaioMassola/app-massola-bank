import React from 'react';
import { View } from 'react-native';
import { color } from 'react-native-reanimated';

import { styles } from './styles';

type Props = {
  isCentered?: boolean;
  color?: string;
};

export function ListDivider({ isCentered, color }: Props) {
  return (
    <View
      style={[
        styles.container,
        isCentered
          ? {
            marginVertical: 12,
          }
          : {
            marginTop: 2,
            marginBottom: 31,
          },
        {
          backgroundColor: color
        }
      ]}
    />
  );
}