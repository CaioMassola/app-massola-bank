import { StyleSheet } from 'react-native';
import { font } from '../../global/font';

export const styles = StyleSheet.create({
  container: {
    flex: 1
},
  buttonView: {
    width: '45%',
    height: 42,
    marginTop: '60%',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
  },
  viewIcon: {
    marginTop: '70%',
    alignItems: 'center'
  },
  massolaBank: {
    fontFamily: font.fonts.title400,
    color: 'white',
    fontSize: 32,
    marginTop: 30,
    textAlign: 'center',
  }
});