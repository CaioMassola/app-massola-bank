import { combineReducers } from "redux";
import darkModeReducer from "./dark-mode-reducer";
import languageReducer from "./language-reducer";
import modalReducer from "./modal-reducer";

export default combineReducers({
  darkModeReducer,
  languageReducer,
  modalReducer,
});
