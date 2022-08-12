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
    textAlign: 'center',
  },
  inputView: {
    marginTop: 10,
    width: '90%',
    marginLeft: 15
  },
  buttonView: {
    width: '45%',
    height: 42,
    marginTop: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
  },
});