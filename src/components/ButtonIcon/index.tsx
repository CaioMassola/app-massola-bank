import React from 'react';
import { Text, Image, View, ImageSourcePropType } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from './styles';

type Props = {
  title: string;
  type?: string;
  icon: string;
  img: ImageSourcePropType ;
  color?: string;
  height?: number;
  accessibilityLabel?: string;
  onPress: () => void;
};

export function ButtonIcon({ title, type, img, icon, color, accessibilityLabel, height, onPress }: Props) {
  if(img) {
    return (
    <TouchableOpacity
      onPress={() => onPress()}
      accessible
      style={[styles.container, { height: height, backgroundColor: color }]}
      accessibilityLabel={accessibilityLabel}
    > 
      <View style={styles.iconWrapper}>
        <Image source={img }style={styles.icon}/>
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>

  );
  } else {
    return (
    <TouchableOpacity
    onPress={() => onPress()}
    accessible
    style={[styles.container, { height: height, backgroundColor: color }]}
    accessibilityLabel={accessibilityLabel}
  > 
    <View style={styles.iconWrapper}>
      <Icon type={type} name={icon} tvParallaxProperties={undefined} />
    </View>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
    );
  }

}