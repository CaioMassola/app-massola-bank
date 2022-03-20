import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import  Login  from '../pages/Login';
import { AppDispatch } from '../redux/store';
import { boolean } from 'yup';
import { setDarkMode } from '../redux/actions/dark-mode-action';
import { connect } from 'react-redux';

type IApp = {
  setShowDarkMode?: (value: boolean) => void;
  dark_mode?: boolean;
}

const Routes = (props: IApp) => {

  return(
    <NavigationContainer>
       <Login dark_mode={props.dark_mode!!} setShowDarkMode={() => props.dark_mode} />
    </NavigationContainer>
  )
}

const mapStateToProps= (state: any) => {
  const dark_mode = state.darkModeReducer;

  return dark_mode
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setShowDarkMode: (value: boolean) => {
    dispatch(setDarkMode(value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Routes)