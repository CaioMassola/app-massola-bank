import { combineReducers } from 'redux';
import darkModeReducer from './dark-mode-reducer';
import languageReducer from './language-reducer';


export default combineReducers({
    darkModeReducer,
    languageReducer
});
