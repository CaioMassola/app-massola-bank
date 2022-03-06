import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { font } from '../../global/font';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewIcon: {
    alignItems: 'center',
    top: getStatusBarHeight() + 30,
  },
  texto: {
    fontSize: 32,
    marginTop: '25%',
    textAlign: 'center',
    color: 'white',
    fontFamily: font.fonts.title400,
  },
  inputView: {
    marginTop: 50,
    width: '90%',
    marginLeft: 15
  },
  buttonView: {
    width: '45%',
    height: 42,
    marginTop: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
  },
  button: {
    width: '65%',
    borderRadius: 80,
    textAlign: 'left'
  },
  createAnAccount: {
    marginTop: 35,
    fontFamily: font.fonts.title400,
    color: 'white',
    textAlign: 'center'
  },
  googleView: {
    marginTop: -1
  },
  textGoogle: {
    fontSize: 32,
    textAlign: 'center',
    color: 'white',
    fontFamily: font.fonts.title400,
  }
})