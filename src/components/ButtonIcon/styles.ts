import { StyleSheet } from 'react-native';
import { font } from '../../global/font';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
  },
  title: {
    flex: 1,
    color: 'black',
    fontSize: 15,
    fontFamily: font.fonts.title400,
    textAlign: 'center',
    marginRight: 10
  },
  iconWrapper: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: 'black',
  },
  icon: {
    width: 28,
    height: 28,
  },
});