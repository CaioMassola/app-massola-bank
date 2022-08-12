import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { font } from '../../global/font';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewIcon: {
    alignItems: 'center',
    top: 15,
  },
  config: {
    marginTop: 15,
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  texto: {
    fontSize: 32,
    marginTop: 40,
    textAlign: 'center',
    color: 'white',
    fontFamily: font.fonts.title400,
  },
  inputView: {
    marginTop: 10,
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
    marginTop: 20,
    fontFamily: font.fonts.title400,
    color: 'white',
    textAlign: 'center'
  },
  googleView: {
    marginTop: -8
  },
  textGoogle: {
    fontSize: 32,
    textAlign: 'center',
    color: 'white',
    fontFamily: font.fonts.title400,
  }
})