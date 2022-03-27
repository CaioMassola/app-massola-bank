import { createStore } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import rootReducer from './reducers/reducers';

// Middleware: Redux Persist Config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'darkModeReducer',
    'languageReducer',
  ],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux: Store
const store = createStore(persistedReducer);

// Middleware: Redux Persist Persister
const persistor = persistStore(store);

// Exports
export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
