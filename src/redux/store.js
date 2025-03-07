import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
// import { contactReducer } from './contacts/slice.js';
// import { filterReducer } from './filters/slice';
// import { authReducer } from './auth/slice';
import { authReducer } from './auth/slice.js';
import { contactReducer } from './contacts/slice.js';
import { filterReducer } from './filters/slice.js';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const authPersistConfig = {
  key: 'auth-persist',
  version: 1,
  storage,
  whitelist: ['token'],
};

// const stage = import.meta.env.MODE;

export const store = configureStore({
  reducer: {
    authNameSlice: persistReducer(authPersistConfig, authReducer),
    contactNameSlice: contactReducer,
    filterNameSlice: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  //! делать обязательно когда сайт не в разработке.
  // devTools: stage === 'development',
});

export const persistor = persistStore(store);
