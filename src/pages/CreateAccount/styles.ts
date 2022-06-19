import { StyleSheet } from 'react-native';
import { font } from '../../global/font';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  config: {
    marginTop: 10,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  labelTitle: {
    fontFamily: font.fonts.title400,
    color: 'white',
    fontSize: 32,
    marginTop: 40,
    textAlign: 'center',
  }
});