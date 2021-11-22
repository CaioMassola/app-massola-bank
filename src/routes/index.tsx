import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import { Login } from '../pages/Login';

export function Routes(){
  
  return(
    <NavigationContainer>
       <Login />
    </NavigationContainer>
  )
}