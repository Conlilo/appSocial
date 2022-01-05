import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {key: 'root', srorege: AsyncStorage};

const reducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});
export const persistor = persistStore(store);
