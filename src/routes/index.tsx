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
  dark_mode?: {
    dark_mode: boolean
  }
  language_redux?: {
    language_redux: string
  }
}

const Routes = (props: IApp) => {

  return(
    <NavigationContainer>
       <Login />        
    </NavigationContainer>
  )
}

export default Routes